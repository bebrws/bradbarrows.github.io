// Looking to add filters from
// https://cdn.rawgit.com/ktingvoar/PixiGlitch/0752d6628e23920a429da71a1881552b16a3b932/examples/dashboard/index.html
// http://gun.net.au/

// Square sin wave idea and code basically from the same guy

console.log("I am trying to learn PIXI. This is from this guys work: http://gun.net.au/");

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var app = new PIXI.Application(WIDTH, HEIGHT, {backgroundColor : 0x212121});
$("#fullcover")[0].appendChild(app.view);

var scale = scaleToWindow(app.view);
window.addEventListener("resize", function(event){ 
  scaleToWindow(app.view);
});

var container = new PIXI.Container();

app.stage.addChild(container);








var slist = [];

function addSquares() {
  var SQUARE_COUNT = 200;
  var MAX_SIZE = 50;
  var MIN_SIZE = 20;
  let COLORS = [0xdddddd, 0x333333, 0xaaaaaa, 0x212121];


  for (var i=0; i<SQUARE_COUNT; i++) {
    var x = Math.random() * WIDTH;
    var y = Math.random() * HEIGHT;

    let color = COLORS[Math.floor(Math.random() * COLORS.length)];

    var size = MIN_SIZE + Math.random() * MAX_SIZE;

    let rot = Math.random() * Math.PI;

    let s = new PIXI.Graphics();
    s.beginFill(color);
    s.drawRect(size * -1, size * -1, size, size);
    s.position.x = x;
    s.position.y = y;
    s.rotation = rot; 

    slist.push({
      size,
      s,
      r: Math.random() * WIDTH
    });

    container.addChild(s);

  }
}

addSquares()






function addText() {
  var style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#598dd0'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440
  });

  var richText = new PIXI.Text('Brad Barrows', style);
  richText.x = WIDTH/2 - 120;
  richText.y = 180;

  container.addChild(richText);
}
addText()






let shakerFrag = `
precision mediump float;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;
uniform vec2 blur;
uniform vec4 dimensions;
void main (void)
{
   vec4 col = texture2D(uSampler, vTextureCoord);
   float pix_w = 1.0 / dimensions.x;
   float pix_h = 1.0 / dimensions.y;
   vec4 col_s[5], col_s2[5];
   for (int i = 0;i < 5;i++){
       col_s[i] = texture2D(uSampler, vTextureCoord + vec2(-pix_w * float(i) * blur.x, -pix_h * float(i) * blur.y));
       col_s2[i] = texture2D(uSampler, vTextureCoord + vec2( pix_w * float(i) * blur.x, pix_h * float(i) * blur.y));
   }
   col_s[0] = (col_s[0] + col_s[1] + col_s[2] + col_s[3] + col_s[4])/5.0;
   col_s2[0]= (col_s2[0] + col_s2[1] + col_s2[2] + col_s2[3] + col_s2[4])/5.0;
   col = (col_s[0] + col_s2[0]) / 2.0;
   gl_FragColor.rgba = col.rgba;
}
`;


function ShakerFilter() {
    PIXI.AbstractFilter.call(this,
      
      null,

      shakerFrag,


    {
        dimensions: {type: '4fv', value: [0, 0, 0, 0]},
        blur: {type: '2fv', value: [5, 0]}
    }
    );

};

ShakerFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
ShakerFilter.prototype.constructor = ShakerFilter;

Object.defineProperty(ShakerFilter.prototype, 'blurX', {
    get: function() {
        return this.uniforms.blur.value[0];
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.blur.value[0] = value;
    }
});

Object.defineProperty(ShakerFilter.prototype, 'blurY', {
    get: function() {
        return this.uniforms.blur.value[1];
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.blur.value[1] = value;
    }
});







let rainbowFrag = `
precision mediump float;

uniform sampler2D uSampler;
varying vec2 vTextureCoord;

uniform float customUniform;

void main (void)
{
   vec2 uvs = vTextureCoord.xy;
   vec4 pixel = texture2D(uSampler, vTextureCoord);
   pixel.r = uvs.y + sin(customUniform);
   pixel.g = uvs.x + sin(customUniform);
   pixel.b = uvs.y + cos(customUniform);
   gl_FragColor = pixel;
}
`;


function RainbowFilter() {
    PIXI.AbstractFilter.call(this,
      
      null,

      rainbowFrag,


    {
        customUniform: {type: '1f', value: 0.001}
    }
    );

};

RainbowFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
RainbowFilter.prototype.constructor = RainbowFilter;

Object.defineProperty(RainbowFilter.prototype, 'rand', {
    get: function() {
        return this.uniforms.rand.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.rand.value = value;
    }
});






var rainbowFilter = new RainbowFilter();
var shakerFilter = new ShakerFilter();

//container.filters = [shakerFilter, rainbowFilter];

container.filters = [rainbowFilter];

//container.filters = [shakerFilter];


app.start();

var steps = 0;
app.ticker.add(function(delta) {

  for (i = 0; i < slist.length; i++) {
    let s = slist[i].s;

    s.rotation += Math.cos(slist[i].r * 0.01) * 0.03;

    s.position.x += Math.sin(slist[i].r * 0.01) * 0.03 * slist[i].size;
    s.position.y += Math.sin(slist[i].r * 0.01) * 0.03 * slist[i].size;

    slist[i].r = slist[i].r + 1;
  }  
  


  //debugger;
  shakerFilter.uniformData.blur.value[0] = Math.floor(Math.random() * 5);
  shakerFilter.uniformData.blur.value[1] = Math.floor(Math.random() * 5);


  rainbowFilter.uniforms.customUniform += delta * 0.04;
  


});





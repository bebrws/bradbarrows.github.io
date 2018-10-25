var app = new PIXI.Application(800, 600, {backgroundColor : 0x212121});
$("#masthead")[0].appendChild(app.view);

var container = new PIXI.Container();

app.stage.addChild(container);

var style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
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
richText.x = 290;
richText.y = 180;

container.addChild(richText);



var squares = [];
function addSquares() {
  var width = 800;
  var height = 600;
  

  var COOL_COLOURS = [0xffffff, 0xffffff, 0xeeeeee, 0xcccccc, 0x999999, 0x555555, 0x777777];
  // create them - a bunch of squares all random
  for (i = 0; i < 500; i++) {
      var sideLength = (Math.exp(Math.random()) - 1) * 100;
      square = new PIXI.Graphics();
      square.beginFill(COOL_COLOURS[Math.floor(Math.random() * COOL_COLOURS.length)]);
      square.drawRect(sideLength * -0.5, sideLength * -0.5, sideLength, sideLength);
      square.position.x = (Math.random() * width * 3) - width;
      square.position.y = (Math.random() * height * 3) - height;
      square.rotation = Math.random() * Math.PI * 2;
      squares.push({
          square: square,
          sideLength: sideLength,
          counter: Math.random() * 1000 - 500
      });
      container.addChild(square);
  }
}

addSquares()



//var twistFilter = new TwistFilter();
//container.filters = [twistFilter];

//var shakerFilter = new ShakerFilter();
//container.filters = [shakerFilter];


// Twist filter from
// https://github.com/ktingvoar/PixiGlitch/blob/master/examples/twist/scripts/main.js




// Test with ano red filter from:
// https://developer.tizen.org/community/tip-tech/creating-pixi.js-filters-using-webgl
function NoRedFilter() {
  var vertexShader = null;
  var fragmentShader = [
    'precision mediump float;',
    '',
    'varying vec2 vTextureCoord;',
    'uniform sampler2D uSampler;',
    '',
    'void main(void)',
    // '{',
    '    vec4 pixel = texture2D(uSampler, vTextureCoord);',
    '    pixel.r = 0.0;',
    '    gl_FragColor = pixel;',
    '}'
  ].join('\n');
  var uniforms = {};

  PIXI.AbstractFilter.call(this,
    vertexShader,
    fragmentShader,
    uniforms
  );
}

NoRedFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
NoRedFilter.prototype.constructor = NoRedFilter;


//var noRedFilter = new NoRedFilter();
//container.filters = [noRedFilter];






var slitScanFrag = `precision mediump float;
uniform float rand;
uniform vec4 dimensions;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;
void main (void)
{
   float slit_h = rand;
   vec2 pos = vTextureCoord * vec2(dimensions);
   vec2 texCoord = vec2(3.0+floor(pos.x/slit_h)*slit_h ,pos.y);
   vec4 col = texture2D(uSampler, texCoord / vec2(dimensions));
   gl_FragColor.rgba = col.rgba;
}
`;

function SlitScanFilter() {
    PIXI.AbstractFilter.call(this,

      null,

      slitScanFrag,

  {
        rand: {type: '1f', value: 15},
        dimensions: {type: '4fv', value: [0, 0, 0, 0]}
    });

};

SlitScanFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
SlitScanFilter.prototype.constructor = SlitScanFilter;

Object.defineProperty(SlitScanFilter.prototype, 'rand', {
    get: function() {
        return this.uniforms.rand.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.rand.value = value;
    }
});



var slitScanFilter = new SlitScanFilter();
//container.filters = [slitScanFilter];










app.start();

var steps = 0;
app.ticker.add(function(delta) {
    console.log("tick");
/*
        randMA = 0;
        randMB = 0;
        val2MA = 0;
        val2MB = 0;
        val3MA = 0;
        val3MB = 0;
        timerMA = Math.random() * 0.05;
        randMA = Math.random() * 0.001;
        randMB = Math.random() * 10 + 10;
        val2MA = Math.random() * 0.0001;
        val2MB = Math.random() * 200 + 150;
        val3MA = Math.random() * 0.0003;
        val3MB = Math.random() * 500 + 200;

      steps ++;
        twistFilter.timer = steps * timerMA;
        twistFilter.rand = Math.sin(steps * randMA) * randMB;
        twistFilter.val2 = Math.sin(steps * val2MA) * val2MB;
        twistFilter.val3 = Math.sin(steps * val3MA) * val3MB;
*/
        for (i = 0; i < squares.length; i++) {
            square = squares[i].square;
            sideLength = squares[i].sideLength;
            counter = squares[i].counter++;
            square.position.x += Math.sin(counter * 0.002) * sideLength * 0.015;
            square.position.y += Math.sin(counter * 0.002) * sideLength * 0.015;
            square.rotation += Math.sin(counter * 0.01) * 0.01;
        }


});






let myFilterFrag = `
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


function MyFilter() {
    PIXI.AbstractFilter.call(this,
      
      null,

      myFilterFrag,


    {
        customUniform: {type: '1f', value: 0.001}
    }
    );

};

MyFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
MyFilter.prototype.constructor = MyFilter;

Object.defineProperty(MyFilter.prototype, 'rand', {
    get: function() {
        return this.uniforms.rand.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.rand.value = value;
    }
});







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


/*

Setup:
var shakerFilter = new ShakerFilter();
container.filters = [shakerFilter];

App tick:
shakerFilter.uniformData.blur.value[0] = Math.floor(Math.random() * 5);
shakerFilter.uniformData.blur.value[1] = Math.floor(Math.random() * 5);

*/












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


/*
Setup:
var rainbowFilter = new RainbowFilter();
container.filters = [rainbowFilter];

App Tick:
rainbowFilter.uniforms.customUniform += delta * 0.04;

*/
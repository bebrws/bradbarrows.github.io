// IDEAS FOR GLITCH EFFECT:
// COULD COMBINE FROM http://pixijs.io/pixi-filters/docs/:
// MotionBlurFilter
// GlitchFilter
// BulgePinchFilter
// PixelateFilter
// RadialBlurFilter
// NoiseFilter
//
// ON ITS OWN THIS MIGHT BE COOL
// ZoomBlurFilter
//




// Looking to add filters from
// https://cdn.rawgit.com/ktingvoar/PixiGlitch/0752d6628e23920a429da71a1881552b16a3b932/examples/dashboard/index.html
// http://gun.net.au/
// https://github.com/ktingvoar/PixiGlitch

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

  var richTextName = new PIXI.Text('Brad Barrows', style);
  richTextName.x = WIDTH/2 - 120;
  richTextName.y = 180;

  container.addChild(richTextName);

  var richTextScratch = new PIXI.Text('See Console Log', style);
  richTextScratch.x = WIDTH/2 - 150;
  richTextScratch.y = 240;

  container.addChild(richTextScratch);  
}
addText()









//var rainbowFilter = new RainbowFilter();
//var shakerFilter = new ShakerFilter();

//container.filters = [shakerFilter, rainbowFilter];

//container.filters = [rainbowFilter];

//container.filters = [shakerFilter];


//debugger;
//var builtInGlitchFilter = new PIXI.filters.GlitchFilter();
//builtInGlitchFilter.slices = 30;
// builtInGlitchFilter.fillMode = 0; // 0 
/* 
Fill Modes:
0 TRANSPARENT
1 ORIGINAL
2 LOOP
3 CLAMP
4 MIRROR
*/
//builtInGlitchFilter.sampleSize = 2048;

//container.filters = [builtInGlitchFilter];

var myFilter = new MyFilter();
container.filters = [myFilter];


app.start();

var steps = 0;
app.ticker.add(function(delta) {

  for (let i = 0; i < slist.length; i++) {
    let s = slist[i].s;

    s.rotation += Math.cos(slist[i].r * 0.01) * 0.03;

    s.position.x += Math.sin(slist[i].r * 0.01) * 0.03 * slist[i].size;
    s.position.y += Math.sin(slist[i].r * 0.01) * 0.03 * slist[i].size;

    slist[i].r = slist[i].r + 1;
  }  
  


  //debugger;


  
  //shakerFilter.uniformData.blur.value[0] = Math.floor(Math.random() * 5);
  //shakerFilter.uniformData.blur.value[1] = Math.floor(Math.random() * 5);

  //rainbowFilter.uniforms.customUniform += delta * 0.04;
  


});



import { GlitchFilter } from '@pixi/filter-glitch';
import { AsciiFilter } from 'pixi-filters'; 
// https://www.npmjs.com/package/pixi-filters
// Demos
// http://pixijs.io/pixi-filters/tools/demo/

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


function customWindowResize() {
    if (window.innerWidth / window.innerHeight >= ratio) {
        var w = window.innerHeight * ratio;
        var h = window.innerHeight;
    } else {
        var w = window.innerWidth;
        var h = window.innerWidth / ratio;
    }
    app.renderer.view.style.width = w + 'px';
    app.renderer.view.style.height = h + 'px';
}


var scale = scaleToWindow(app.view);
window.addEventListener("resize", function(event){ 
  scaleToWindow(app.view);
  customWindowResize();
});

$(window).resize(function(){
  scaleToWindow(app.view);
  customWindowResize();
});

var container = new PIXI.Container();

app.stage.addChild(container);



// For Font Awesome
// 20 Sided die
// <i class="far fa-dice-d20"></i>
// https://fontawesome.com/icons/dice-d20?style=regular
// Just using the SVG and loading it as a texture
let d20Texture = new PIXI.Texture.fromImage('./imgs/d20.svg', undefined, undefined, 1.0)

let githubTexture = new PIXI.Texture.fromImage('./imgs/github.svg', undefined, undefined, 1.0)

//let d20Sprite = new PIXI.Sprite(d20Texture);
//d20Sprite.x = 300;
//d20Sprite.y = 300;
//container.addChild(d20Sprite);




var slist = [];

function addSquares() {
  var SQUARE_COUNT = 200;
  var MAX_SIZE = 50;
  var MIN_SIZE = 20;
  let COLORS = [0xdddddd, 0x333333, 0xaaaaaa, 0x212121];
  let SPEED_MAX = 20;
  let SPEED_MIN = 40;

  for (var i=0; i<SQUARE_COUNT; i++) {
    var x = Math.random() * WIDTH;
    var y = Math.random() * HEIGHT;

    let color = COLORS[Math.floor(Math.random() * COLORS.length)];

    var size = MIN_SIZE + Math.random() * MAX_SIZE;

    let rot = Math.random() * Math.PI;

    // debugger
    let d20Sprite = new PIXI.Sprite(d20Texture);
    d20Sprite.x = 300;
    d20Sprite.y = 300;

    d20Sprite.tint = "0x00FF00";

    // let s = new PIXI.Graphics();
    // d20Sprite.beginFill(color);
    // s.drawRect(size * -1, size * -1, size, size);
    d20Sprite.position.x = x;
    d20Sprite.position.y = y;
    d20Sprite.rotation = rot; 

    d20Sprite.buttonMode = true;
    d20Sprite.interactive = true;

    function mouseEventHandler(e) {
      //console.log(`D20 E ${e}`);
      //debugger
    }
    d20Sprite
      .on('pointerdown', mouseEventHandler)
      .on('pointerup', mouseEventHandler)
      .on('pointerupoutside', mouseEventHandler)
      .on('w', mouseEventHandler)
      .on('pointerout', mouseEventHandler);    

    slist.push({
      size,
      s: d20Sprite,
      r: Math.floor(Math.random() * WIDTH),
      speed: ( Math.floor(Math.random() * SPEED_MAX) + SPEED_MIN ) / 1000
    });

    container.addChild(d20Sprite);

  }
}

addSquares()





function addText() {
  var nameStyle = new PIXI.TextStyle({
      fontFamily: 'Anonymous Pro',
      fontSize: 120,
      fontWeight: 'bold',
      fill: ['#70da3c', '#5aa037'], // gradient
      stroke: '#13250a',
      strokeThickness: 1,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 800
  });

  var richTextName = new PIXI.Text('Brad Barrows', nameStyle);
  richTextName.x = (WIDTH/2) - (richTextName.width/2);
  richTextName.y = 180;

  container.addChild(richTextName);

/*
  var noteStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 60,
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
      wordWrapWidth: 800
  });
  var richTextScratch = new PIXI.Text('See Console Log', noteStyle);
  richTextScratch.x = (WIDTH/2) - (richTextScratch.width/2);
  richTextScratch.y = 240;

  container.addChild(richTextScratch);  
  */ 
}
addText();








//var rainbowFilter = new RainbowFilter();
//var shakerFilter = new ShakerFilter();

//container.filters = [shakerFilter, rainbowFilter];

//container.filters = [rainbowFilter];

//container.filters = [shakerFilter];


// debugger;
//var builtInGlitchFilter = new GlitchFilter();
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
// builtInGlitchFilter.sampleSize = 2048;

// container.filters = [builtInGlitchFilter];


//var builtInAsciiFilter = new AsciiFilter();






let githubSprite = new PIXI.Sprite(githubTexture);


    function githubMouseEventHandler(e) {
      console.log(`github E ${e}`);
      window.location = 'https://github.com/bbarrows';      
    }

    githubSprite
      .on('pointerdown', githubMouseEventHandler)
      .on('pointerup', githubMouseEventHandler)
      .on('pointerupoutside', githubMouseEventHandler)
      .on('w', githubMouseEventHandler)
      .on('pointerout', githubMouseEventHandler);    


githubSprite.interactive = true;
githubSprite.buttonMode = true;
githubSprite.anchor.set(0.5);

githubSprite.x = 100;
githubSprite.y = 600;
container.addChild(githubSprite);




app.start();

var steps = 0;
app.ticker.add(function(delta) {

  // console.log(`Step ${steps}`)
  steps += 1;
  if (steps > window.innerWidth) {
    steps = 0;
  }

  for (var i = 0; i < slist.length; i++) {
    let s = slist[i].s;
    let speed = slist[i].speed;

    s.rotation += Math.cos(slist[i].r * 0.01) * speed;

    s.position.x += Math.sin(slist[i].r * 0.01) * speed * slist[i].size;
    s.position.y += Math.cos(slist[i].r * 0.01) * speed * slist[i].size;

    slist[i].r += 1;
  }  
  

  // githubSprite.x = steps;
  // githubSprite.y = (Math.sin(steps * 0.05) * 100) + 500;  



  //debugger;


  
  //shakerFilter.uniformData.blur.value[0] = Math.floor(Math.random() * 5);
  //shakerFilter.uniformData.blur.value[1] = Math.floor(Math.random() * 5);

  //rainbowFilter.uniforms.customUniform += delta * 0.04;


  //builtInGlitchFilter.slices = Math.floor(Math.random() * 10) + 20;
  

});

/*
var FILTER_DELAY = 3000;
function globalOnmousemove(event) {
  // Start ASCII Filter
  var lastMovement = (new Date()).getTime();
  container.filters = [builtInAsciiFilter];

  let checkFilterFunc = function () {
    // console.log('Checking filter delay');
    let curTime = (new Date()).getTime();
    if (lastMovement + FILTER_DELAY < curTime) {
      container.filters = [];
      // console.log('Clearing out filters');
    } else {
      // console.log('Leaving filter in place');
      checkFilterFunc();
    }
    
  }

  setTimeout(checkFilterFunc, FILTER_DELAY);
}

window.onmousemove = globalOnmousemove;
*/





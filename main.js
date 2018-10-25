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




function addSquares() {
  var width = 800;
  var height = 600;
  var squares = [];

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

var shakerFilter = new ShakerFilter();
container.filters = [shakerFilter];


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


var noRedFilter = new NoRedFilter();

//container.filters = [noRedFilter];





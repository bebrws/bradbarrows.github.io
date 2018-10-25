var app = new PIXI.Application(800, 600, {backgroundColor : 0x212121});
$("#masthead")[0].appendChild(app.view);

var container = new PIXI.Container();

app.stage.addChild(container);




var SQUARE_COUNT = 200;
var WIDTH = 800;
var HEIGHT = 600;
var MAX_SIZE = 50;
var MIN_SIZE = 20;
let COLORS = [0xdddddd, 0x333333, 0xaaaaaa, 0x212121];

let slist = [];

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
richText.x = 290;
richText.y = 180;

container.addChild(richText);





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


});





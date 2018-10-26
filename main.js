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

  var richText = new PIXI.Text('Brad Barrows', style);
  richText.x = WIDTH/2 - 120;
  richText.y = 180;

  container.addChild(richText);
}
addText()


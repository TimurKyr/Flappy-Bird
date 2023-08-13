const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "assets/images/bird.png"
bg.src = "assets/images/bg.png"
fg.src = "assets/images/fg.png"
pipeUp.src = "assets/images/pipeUp.png"
pipeBottom.src = "assets/images/pipeBottom.png"

function draw() {
    ctx.drawImage(bg, 0, 0);
}

pipeBottom.onload = draw;

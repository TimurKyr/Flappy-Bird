const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const heightId = document.getElementById("height");

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

const gap = 140;

document.addEventListener("keydown", moveUp);

xPos = 100;
yPos = 200;
grav = 2;

var pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
}

function draw() {
    ctx.drawImage(bg, 0, 0);
    heightId.textContent = "Height = " + yPos;

    for(var i = 0; i < pipe.length; i ++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x --;

        if(pipe[i].x == 300) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if(xPos + bird.width >= pipe[i].x &&
           xPos <= pipe[i].x + pipeUp.width &&
           (yPos <= pipe[i].y + pipeUp.height ||
           yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
            location.reload();
        }

        if(yPos == canvas.height - fg.height - bird.height) {
            location.reload();
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;
    requestAnimationFrame(draw);
}

function moveUp() {
    yPos -= 40;
}

pipeBottom.onload = draw;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreId = document.getElementById("score");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var score = 0;

bird.src = "assets/images/bird.png"
bg.src = "assets/images/bg.png"
fg.src = "assets/images/fg.png"
pipeUp.src = "assets/images/pipeUp.png"
pipeBottom.src = "assets/images/pipeBottom.png"

const gap = 150;

document.addEventListener("keydown", moveUp);

xPos = 100;
yPos = 200;
grav = 2;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var pipe = [];
pipe[0] = {
    x: canvas.width,
    y: -167
}

function draw() {
    ctx.drawImage(bg, 0, 0);
    scoreId.textContent = "Score: " + score;

    for(var i = 0; i < pipe.length; i ++) {
        if(pipe[i].x + pipeUp.width < 0){
            pipe.shift();
        }

        if(xPos == pipe[i].x + pipeUp.width) {
            score += 1;
        }

        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x -= 2;

        if(pipe[i].x == 260) {
            var y = Math.min(pipe[i].y + randomIntFromInterval(-100, 100), 0.8*pipeUp.height);
            pipe.push({
                x: canvas.width,
                y: y = Math.max(y, -0.8*pipeUp.height)
            });
        }

        if(xPos + bird.width >= pipe[i].x &&
           xPos <= pipe[i].x + pipeUp.width &&
           (yPos <= pipe[i].y + pipeUp.height ||
           yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
            location.reload();
        }

        if(yPos >= canvas.height - fg.height - bird.height) {
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

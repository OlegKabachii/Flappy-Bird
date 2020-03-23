var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/Up.png";
pipeBottom.src = "img/Bottom.png";

var fly = new Audio();
var scoreAudio = new Audio();

fly.src = "audio/fly.mp3";
scoreAudio.src = "audio/score.mp3";

var gap = 100;

document.addEventListener('keydown', moveUp);

var score = 0;

var xPos = 50;
var yPos = 150;
var grav = 0.7;

function moveUp() {
    yPos -= 40;
    fly.play();
    
}
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let index = 0; index < pipe.length; index++) {
        ctx.drawImage(pipeUp, pipe[index].x, pipe[index].y);
        ctx.drawImage(pipeBottom, pipe[index].x, pipe[index].y +
            pipeUp.height + gap);
        pipe[index].x--;
        if (pipe[index].x == 50) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) -
                    pipeUp.height
            });
        }
        if (xPos + bird.width >= pipe[index].x &&
            xPos <= pipe[index].x + pipeUp.width &&
            (yPos <= pipe[index].y + pipeUp.height ||
                yPos + bird.height >= pipe[index].y + pipeUp.height +
                gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload();
        }
        if (pipe[index].x == 5) {
            score++;
            scoreAudio.play();
        }
    }


    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;


    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}
pipeBottom.onload = draw;
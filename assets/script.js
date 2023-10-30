const canvas = document.getElementById('pinballCanvas');
const ctx = canvas.getContext('2d');
const ballImage = new Image();
ballImage.src = "https://flxt.tmsimg.com/assets/490690_v9_bb.jpg";

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 5,
    dy: -5,
};

const paddle = {
    width: 100,
    height: 10,
    x: (canvas.width - 100) / 2,
    speed: 10,
};

const keys = {};
let score = 0;

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function movePaddle() {
    if (keys['ArrowRight'] && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.speed;
    }
    if (keys['ArrowLeft'] && paddle.x > 0) {
        paddle.x -= paddle.speed;
    }
}

function restartGame() {
    score = 0;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 5;
    ball.dy = -5;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
    }
    if (
        ball.y + ball.radius > canvas.height - paddle.height &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy = -ball.dy;
        score++;

        if (score === 10) {
            alert('Congratulations! You won the game!');
            restartGame();
        }
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    if (ball.y + ball.radius > canvas.height) {
        const restart = confirm('Game over. You lost. Restart the game?');
        if (restart) {
            restartGame();
        } else {
            document.location.reload();
        }
    }

    movePaddle();

    requestAnimationFrame(draw);
}

draw();

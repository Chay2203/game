const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 20;
const rows = canvas.height / tileSize;
const cols = canvas.width / tileSize;

let pacMan = {
    x: tileSize * 10,
    y: tileSize * 10,
    dx: tileSize,
    dy: 0,
    radius: tileSize / 2,
    angle: 0.3
};

const walls = [
    {x: 5, y: 5},
    {x: 6, y: 5},
    {x: 7, y: 5},
    // Add more walls as needed
];

document.addEventListener('keydown', changeDirection);

function drawPacMan() {
    ctx.beginPath();
    ctx.arc(pacMan.x + pacMan.radius, pacMan.y + pacMan.radius, pacMan.radius, pacMan.angle * Math.PI, (2 - pacMan.angle) * Math.PI);
    ctx.lineTo(pacMan.x + pacMan.radius, pacMan.y + pacMan.radius);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
}

function drawWalls() {
    ctx.fillStyle = 'blue';
    for (const wall of walls) {
        ctx.fillRect(wall.x * tileSize, wall.y * tileSize, tileSize, tileSize);
    }
}

function changeDirection(event) {
    const keyPressed = event.keyCode;

    switch(keyPressed) {
        case 37: // left arrow
            pacMan.dx = -tileSize;
            pacMan.dy = 0;
            break;
        case 38: // up arrow
            pacMan.dx = 0;
            pacMan.dy = -tileSize;
            break;
        case 39: // right arrow
            pacMan.dx = tileSize;
            pacMan.dy = 0;
            break;
        case 40: // down arrow
            pacMan.dx = 0;
            pacMan.dy = tileSize;
            break;
    }
}

function movePacMan() {
    pacMan.x += pacMan.dx;
    pacMan.y += pacMan.dy;

    if (pacMan.x < 0) pacMan.x = canvas.width - tileSize;
    else if (pacMan.x >= canvas.width) pacMan.x = 0;
    if (pacMan.y < 0) pacMan.y = canvas.height - tileSize;
    else if (pacMan.y >= canvas.height) pacMan.y = 0;
}

function detectCollision() {
    for (const wall of walls) {
        if (pacMan.x === wall.x * tileSize && pacMan.y === wall.y * tileSize) {
            pacMan.dx = 0;
            pacMan.dy = 0;
        }
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    clearCanvas();
    drawWalls();
    drawPacMan();
    movePacMan();
    detectCollision();
    requestAnimationFrame(gameLoop);
}

gameLoop();

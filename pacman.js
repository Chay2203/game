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
    angle: 0.3,
    direction: 'right'
};

const walls = [
    {x: 5, y: 5},
    {x: 6, y: 5},
    {x: 7, y: 5},
    // Add more walls as needed
];

let pellets = [];
for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        if (!walls.some(wall => wall.x === i && wall.y === j)) {
            pellets.push({x: i, y: j});
        }
    }
}

document.addEventListener('keydown', changeDirection);

function drawPacMan() {
    ctx.beginPath();
    ctx.arc(pacMan.x + pacMan.radius, pacMan.y + pacMan.radius, pacMan.radius, (pacMan.angle + pacMan.directionAngle) * Math.PI, (2 - pacMan.angle + pacMan.directionAngle) * Math.PI);
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

function drawPellets() {
    ctx.fillStyle = 'white';
    for (const pellet of pellets) {
        ctx.beginPath();
        ctx.arc(pellet.x * tileSize + tileSize / 2, pellet.y * tileSize + tileSize / 2, tileSize / 5, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    let newDirection;

    switch(keyPressed) {
        case 37: // left arrow
            newDirection = 'left';
            break;
        case 38: // up arrow
            newDirection = 'up';
            break;
        case 39: // right arrow
            newDirection = 'right';
            break;
        case 40: // down arrow
            newDirection = 'down';
            break;
    }

    if (newDirection && !detectWallCollision(newDirection)) {
        pacMan.direction = newDirection;
        switch (newDirection) {
            case 'left':
                pacMan.dx = -tileSize;
                pacMan.dy = 0;
                pacMan.directionAngle = 1;
                break;
            case 'up':
                pacMan.dx = 0;
                pacMan.dy = -tileSize;
                pacMan.directionAngle = 1.5;
                break;
            case 'right':
                pacMan.dx = tileSize;
                pacMan.dy = 0;
                pacMan.directionAngle = 0;
                break;
            case 'down':
                pacMan.dx = 0;
                pacMan.dy = tileSize;
                pacMan.directionAngle = 0.5;
                break;
        }
    }
}

function movePacMan() {
    if (!detectWallCollision(pacMan.direction)) {
        pacMan.x += pacMan.dx;
        pacMan.y += pacMan.dy;
    }

    if (pacMan.x < 0) pacMan.x = canvas.width - tileSize;
    else if (pacMan.x >= canvas.width) pacMan.x = 0;
    if (pacMan.y < 0) pacMan.y = canvas.height - tileSize;
    else if (pacMan.y >= canvas.height) pacMan.y = 0;

    detectPelletCollision();
}

function detectWallCollision(direction) {
    let nextX = pacMan.x;
    let nextY = pacMan.y;

    switch (direction) {
        case 'left':
            nextX -= tileSize;
            break;
        case 'up':
            nextY -= tileSize;
            break;
        case 'right':
            nextX += tileSize;
            break;
        case 'down':
            nextY += tileSize;
            break;
    }

    return walls.some(wall => wall.x * tileSize === nextX && wall.y * tileSize === nextY);
}

function detectPelletCollision() {
    pellets = pellets.filter(pellet => {
        if (pacMan.x === pellet.x * tileSize && pacMan.y === pellet.y * tileSize) {
            return false;
        }
        return true;
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    clearCanvas();
    drawWalls();
    drawPellets();
    drawPacMan();
    movePacMan();
    requestAnimationFrame(gameLoop);
}

gameLoop();

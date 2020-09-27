function getRndInteger(max) {
    return Math.floor(Math.random() * max);
  }

document.addEventListener("keydown", keyDown);

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// Konstanta värden, som ej ändras
const width = 20;
const height = 20;

const rows = 40;
const columns = 40;

// Ändrar storleken på vår canvas
c.height = rows * height;
c.width = columns * width;

var length = 1;

// sätt start till centrum av området
var x = columns / 2;
var y = rows / 2;

// Variabler för rörelse
var deltaX = 0;
var deltaY = 0;

// matens position
var foodY = getRndInteger(rows);
var foodX = getRndInteger(columns);

// positioner
var positioner = []; 

setInterval ( GameLoop, 100);

function GameLoop()
{
    clearScreen();
  
    drawSnake();
    
    drawFood();

    moveSnake();
}

function drawFood() {
    ctx.fillStyle = "red";
    
    drawSegment(foodX, foodY);
}

function clearScreen()
{
    ctx.clearRect(0, 0, c.width, c.height); 
}

function drawSnake()
{
    ctx.fillStyle = "green";

    for(let p of positioner)
    {
        drawSegment(p.x, p.y);
    }
}

function drawSegment(x, y)
{
    ctx.fillRect(x * width, y * height, width, height); 
}

function moveSnake()
{
    x = x + deltaX;
    y = y + deltaY;
    
    if (x < 0)
    {
        x = columns;
    }
    if (x > columns)
    {
        x = 0;
    }
    if (y < 0)
    {
        y = rows;
    }
    if (y > rows)
    {
        y = 0;
    }

    if (x == foodX && y == foodY)
    {
        length = length +5;
         foodY = getRndInteger(rows);
         foodX = getRndInteger(columns);
    }

    positioner.push({x: x, y: y});
    if (positioner.length >length)
    {
        positioner = positioner.slice(1);
    }
}

function keyDown(key)
{
    if (key.code == 'ArrowDown' || 
        key.key == 's')
    {
        deltaX = 0;
        deltaY = 1;
    }
    else if (key.code == 'ArrowUp' ||
             key.key == 'w')
    {
        deltaX = 0;
        deltaY = -1;
    }
    else if (key.code == 'ArrowLeft' ||
             key.key == 'a')
    {
        deltaX = -1;
        deltaY = 0;
    }
    else if (key.code == 'ArrowRight' ||
             key.key == 'd')
    {
        deltaX = 1;
        deltaY = 0;
    }
}
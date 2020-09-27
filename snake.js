function getRndInteger(max) {
    return Math.floor(Math.random() * max);
  }

class Position {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    equals(p){
        return this.x == p.x && this.y == p.y;
    } 
  }

class Snake {
    constructor(color, x, y) {
        this.color = color;
        this.add(x, y);
        this.move = this.stil;
    }
      
    length = 1;
    
    // positioner
    positioner = [];

    grow(){
        
            this.length = this.length + growth;
        
    }

    stil() {
        return this.head;
    }

    left() {
        let x = this.head.x - 1;
        let y = this.head.y;

        if (x < 0){
            x = columns - 1;
        }

        return this.add(x, y);
    }

    right() {
        let x = this.head.x + 1;
        let y = this.head.y;

        if (x > columns - 1){
            x = 0;
        }

        return this.add(x, y);
    }

    up() {
        let x = this.head.x;
        let y = this.head.y - 1;

        if (y < 0){
            y = rows - 1;
        }

        return this.add(x, y);
    }

    down() {
        let x = this.head.x;
        let y = this.head.y + 1;

        if (y > rows - 1){
            y = 0;
        }

        return this.add(x, y);
    }

    add(x, y) {
        let h = new Position(x, y);
        
        this.head = h;
        this.positioner.push(h);

        if (this.positioner.length > this.length){
            this.positioner.shift();
        }

        return h;
    }
}

document.addEventListener("keydown", keyDown);

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// Konstanta värden, som ej ändras
const width = 20;
const height = 20;

const rows = 20;
const columns = 20;

const growth = 1;

// Ändrar storleken på vår canvas
c.height = rows * height;
c.width = columns * width;

var player1 = new Snake("green", columns / 2, rows / 2);
var player2 = new Snake("blue", columns / 2, rows / 2);


// matens position
var food = new Position(getRndInteger(rows), getRndInteger(columns));


setInterval ( GameLoop, 100);

function GameLoop()
{
    let newFood = false;
    clearScreen();
  
    
    let p1 = player1.move();
    if (p1.equals(food)){
        player1.grow();
        newFood =true;
    }

    let p2 = player2.move();
    if (p2.equals(food)){
        player2.grow();
        newFood =true;
    }

    drawSnake(player1);
    drawSnake(player2);
    
    if (newFood){
        food = new Position(getRndInteger(rows), getRndInteger(columns));       
    }

    drawFood();
}

function drawFood() {
    ctx.fillStyle = "red";
    
    drawSegment(food);
}

function clearScreen()
{
    ctx.clearRect(0, 0, c.width, c.height); 
}

function drawSnake(snake)
{
    ctx.fillStyle = snake.color;

    for(let p of snake.positioner)
    {
        drawSegment(p);
    }
}

function drawSegment(p)
{
    ctx.fillRect(p.x * width, p.y * height, width, height); 
}


function keyDown(key)
{
    if (key.code == 'ArrowDown')
    {
        player1.move = player1.down;
    }
    else if (key.code == 'ArrowUp')
    {
        player1.move = player1.up;
    }
    else if (key.code == 'ArrowLeft' )
    {
        player1.move = player1.left;
    }
    else if (key.code == 'ArrowRight' )
    {
        player1.move = player1.right;
    }

    if ( key.key == 's')
    {
        player2.move = player2.down;
    }
    else if (key.key == 'w')
    {
        player2.move = player2.up;
    }
    else if (key.key == 'a')
    {
        player2.move = player2.left;
    }
    else if (key.key == 'd')
    {
        player2.move = player2.right;
    }
}
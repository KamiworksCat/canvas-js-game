let gameArea;
let gamePiece;
let CanvasVar;

function GameArea() {
    this.canvas = document.getElementById("game-section");
    CanvasVar = this.canvas;
    this.canvas.width = 960;
    this.canvas.height = 540;
    this.context = this.canvas.getContext("2d");
    this.pause = false;
    this.frameNo = 0;
    this.start = function() {
        updateGameArea();
        // this.interval = setInterval(updateGameArea, 20);
    }
    this.clear = function(){
        this.context.clearRect(0, 0,
          this.canvas.width, this.canvas.height);
    }
}

function startGame(){
  gameArea = new GameArea();
  gamePiece = new Cube("red", 10, 120, "cube");
  gameArea.start();
}

function Cube(color, xcoord, ycoord, name){
  this.width = 30;
  this.height = 30;
  this.x = xcoord;
  this.y = ycoord;
  this.speedX = 0;
  this.speedY = 0;
  this.name = name;
  this.update = function() {
    ctx = gameArea.context;
    ctx.font = this.width + " " + this.height;
    ctx.fillStyle = color;
    ctx.fillText(this.name, this.x, (this.y + 30));
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function () {
    let newX = this.x + this.speedX;
    let newY = this.y + this.speedY;
    if (0 < newX < (CanvasVar.width - 30)){
      this.x = newX;
    }
    if (0 < newY < (CanvasVar.height - 30)){
      this.y = newY;
    }
  }
}

function updateGameArea(){
  gameArea.clear();
  gamePiece.newPos();
  gamePiece.update();
  clearmove();
}

function move(direction){
  if (direction === "up"){
    gamePiece.speedY = -10;
  }
  else if (direction === "down"){
    gamePiece.speedY = 10;
  }
  else if (direction === "left"){
    gamePiece.speedX = -10;
  }
  else if (direction === "right"){
    gamePiece.speedX = 10;
  }
  updateGameArea();
}

function clearmove(){
  gamePiece.speedX = 0;
  gamePiece.speedY = 0;
}

startGame();

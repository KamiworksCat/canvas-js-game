let movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "a": // A
      movement.left = true;
      break;
    case "w": // W
      movement.up = true;
      break;
    case "d": // D
      movement.right = true;
      break;
    case "s": // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case "a": // A
      movement.left = false;
      break;
    case "w": // W
      movement.up = false;
      break;
    case "d": // D
      movement.right = false;
      break;
    case "s": // S
      movement.down = false;
      break;
  }
});

function Cube(color, xcoord, ycoord, name){
  this.width = 30;
  this.height = 30;
  this.x = xcoord;
  this.y = ycoord;
  this.name = name;
  this.update = function() {
    ctx = gameArea.context;
    ctx.font = this.width + " " + this.height;
    ctx.fillStyle = color;
    ctx.fillText(this.name, (this.x - 10), (this.y - 30));
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function (newX, newY) {
    if (newX < (CanvasVar.width - 30) && newX > 0){
      this.x += newX;
    }
    if (newY < (CanvasVar.height - 30) && newY > 0){
      this.y += newY;
    }
  }
}

function GameArea() {
    this.canvas = document.getElementById("game-section");
    CanvasVar = this.canvas;
    this.canvas.width = 840;
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

let player_colors = ["red", "blue", "green", "yellow"];

let player_coord = [
  {"x": 10, "y": 120},
  {"x": 80, "y": 120},
  {"x": 80, "y": 180},
  {"x": 180, "y": 280}
]

function start_game(player_list){
  gameArea = new GameArea();
  for (let counter in player_list){
    // Populate game pieces with player coordinate, color and name
    // let player =
  }
  // Start the game
  gamePiece = new Cube("red", 10, 120, "cube");
  gameArea.start();
}

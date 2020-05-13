let gameArea;
let gamePiece;
let CanvasVar;
let server_url = "18f00ddf.ngrok.io";
let debug_screen = document.getElementById("debug-screen");
let game_session_websocket = "ws://" + server_url + "/ws/game/";

function startGame(){
  gameArea = new GameArea();
  gamePiece = new Cube("red", 10, 120, "cube");
  gameArea.start();
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

// Set Player ID
let s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}

let game_tag = document.getElementById("personal-id");
game_tag.value = s4() + s4();


// Add Debug Message
function add_debug_message(text_message){
  let tag = document.createElement("p");
  let text = document.createTextNode(text_message);
  tag.append(text);
  debug_screen.appendChild(tag);
}

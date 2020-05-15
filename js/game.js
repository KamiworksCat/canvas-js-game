let game_session_websocket = "wss://" + server_url + "/ws/game/";
let game_websocket;

let movement = {
  up: false,
  down: false,
  left: false,
  right: false
}

function SetGamePiece(color, xcoord, ycoord, name){
  let ctx = gameArea.context;
  ctx.font = "10px Arial";
  ctx.fillStyle = color;
  ctx.fillText(name, xcoord, (ycoord - 10));
  ctx.fillRect(xcoord, ycoord, 30, 30);
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
        UpdateGameArea();
        // this.interval = setInterval(updateGameArea, 20);
    }
    this.clear = function(){
        this.context.clearRect(0, 0,
          this.canvas.width, this.canvas.height);
    }
}

function UpdateGameArea(){
  gameArea.clear();
  for (let counter in player_list){
    let player = player_list[counter]
    SetGamePiece(player.color, player.coordinates.x,
      player.coordinates.y, player.player_name);
  }
}

let player_colors = ["red", "blue", "green", "yellow"];

let player_coord = [
  {"x": 40, "y": 120},
  {"x": 300, "y": 120},
  {"x": 80, "y": 380},
  {"x": 420, "y": 280}
]

function start_game(room_id){
  add_debug_message("Connecting to game websocket");
  ConnectGameWebsockt(room_id);
  gameArea = new GameArea();
  add_debug_message("Start game with game pieces");
  for (let counter in player_list){
    // Populate game pieces with player coordinate, color and name
    let player = player_list[counter];
    SetGamePiece(player.color, player.coordinates.x,
      player.coordinates.y, player.name);
  }
  gameArea.start();
}

function ConnectGameWebsockt(room_id){
  game_websocket = new WebSocket((game_session_websocket + room_id + "/"));
  game_websocket.onopen = function (e) {
    add_debug_message("Signing into the game websocket");
    game_websocket.send(JSON.stringify({
      "sign_in": gamer_id + "," + player_name.value
    }));
  }
  game_websocket.onerror = function (e) {
    gameArea.clear();
    console.log("Unexpected error has occurred");
    console.log(e);
  }
  game_websocket.onclose = function (e) {
    gameArea.clear();
    console.log(e);
    console.log("Websocket unexpectedly closed");
  }
  game_websocket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    let debug_message = data["debug"];
    let game_message= data["game_message"];
    add_debug_message(debug_message);
    if (game_message !== undefined){
      add_debug_message("Received player movements");
      let select_player_id = game_message[0];
      let player_movement = game_message[1];
      let select_player = player_list[select_player_id];
      add_debug_message("Player that is moving " + select_player.player_name);
      add_debug_message("Player\'s movement: " + JSON.stringify(player_movement));
      player_move(select_player, player_movement);
      UpdateGameArea();
    }
  }
}

function player_move(select_player, player_movement){
  if (player_movement.up){
    select_player.coordinates.y -= 10;
  }
  if (player_movement.down){
    select_player.coordinates.y += 10;
  }
  if (player_movement.left){
    select_player.coordinates.x -= 10;
  }
  if (player_movement.right){
    select_player.coordinates.x += 10;
  }
}

function move(direction){
  if (direction === "up"){
    movement.up = true;
  }
  else if (direction === "down"){
    movement.down = true;
  }
  else if (direction === "left"){
    movement.left = true;
  }
  else if (direction === "right"){
    movement.right = true;
  }
  add_debug_message("Send direction movements to game websocket");
  game_websocket.send(JSON.stringify({
    "game_message": [gamer_id, movement]
  }));
  ResetMove();
}

function ResetMove(){
  movement.up = false;
  movement.down = false;
  movement.left = false;
  movement.right = false;
}

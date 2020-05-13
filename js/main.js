// Set game area, game pieces and player_list
let gameArea;
let gamePiece;
let CanvasVar;
let player_list = {};

let server_url = "18f00ddf.ngrok.io";
let debug_screen = document.getElementById("debug-screen");

// Set Player ID
let s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}

let game_tag = document.getElementById("personal-id");
let gamer_id = s4() + s4();
game_tag.value = gamer_id;


// Add Debug Message
function add_debug_message(text_message){
  let tag = document.createElement("p");
  let text = document.createTextNode(text_message);
  tag.append(text);
  debug_screen.appendChild(tag);
  debug_screen.scrollTop = debug_screen.scrollHeight;
}

let matchmaking_socket_url = "ws://" + server_url + "/ws/lobby/";

let player_name = document.getElementById("name-id");

let player_data = JSON.stringify({
  "player_id": game_tag.value,
  "name": player_name.value
});

function connect_matchmake(){
  let matchmake_websocket = new WebSocket(matchmaking_socket_url);

  matchmake_websocket.onopen = function (e) {
    matchmake_websocket.send(player_data);
  };

  matchmake_websocket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    let debug_message = data["debug"];
    debug_screen.value += (debug_message + "\n");
  }
};


let matchmaking_socket_url = "wss://" + server_url + "/ws/matchmake/lobby/";

let player_name = document.getElementById("name-id");

let player_data = JSON.stringify({
  "player_id": game_tag.value,
  "name": player_name.value
});

function connect_matchmake(){
  add_debug_message("Attempt to connect to matchmaking");
  let matchmake_websocket = new WebSocket(matchmaking_socket_url);

  matchmake_websocket.onopen = function (e) {
    add_debug_message("Sending player data");
    matchmake_websocket.send(player_data);
  };

  matchmake_websocket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    let debug_message = data["debug"];
    let game_room_id = data["game_room"];
    add_debug_message(debug_message);
    console.log(data);
    if (game_room_id !== undefined){
      // Game Room has been assigned and players are populated
      let player_data = data["players"];
      for (let counter in player_data){
        let data_array = player_data[counter].split(",");
        player_list[data_array[0]] = {
          "player_name": data_array[1],
          "color": player_colors[counter],
          "coordinates": player_coord[counter]
        }
      }
      add_debug_message("Closing matchmaking websocket");
      matchmake_websocket.close();
      start_game(game_room_id);
    }
  }

  matchmake_websocket.onerror = function (e) {
    console.error(e);
    console.log("Websocket closed unexpectedly");
  }
}


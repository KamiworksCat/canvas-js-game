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
    if (game_room_id !== undefined){
      // Game Room has been assigned and players are populated
      let player_data = data["players"];
      let player_list = [];
      for (let counter = 0; counter > player_data.length; counter++){
        let data_array = player_data[counter].split(",");
        player_list.push({
          "player_id": data_array[0],
          "player_name": data_array[1],
          "color": player_colors[(counter+1)]
        });
      }
    }
    // TODO If websocket receive notification, nothing happens
    // TODO If receive data about player list and room id
    // TODO Proceed to assign data to html elements and close websocket
    // TODO Send data to game start function to populate players
  }

  matchmake_websocket.onerror = function (e) {
    console.error(e);
    console.log("Websocket closed unexpectedly");
  }
}


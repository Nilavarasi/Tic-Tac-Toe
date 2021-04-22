const app=require("express")();
const http=require("http").Server(app);
const io=require("socket.io")(http);
const tic_tac_toe_board=require("./tic_tac_toe");

let num_of_players=0; // Number of players
let players=[null, null]; // Player sockets will be stored here, only two players are allowed here
let player_turn=0;  // Tracks the next player to play
let is_won=false; // Detects the wining



/**
 * This portion is used for checking the entry of players
 * It make sure to allow only 2 players
 * It prints the player numbers
 */

// When connection starts
io.on("connection", function(socket) {
  // Condition to check more then 2 users are entering the game
    if (num_of_players>=2) {
    socket.emit("event", "Only two players are allowed to play the game!");
    socket.disconnect();
  } else {
    num_of_players+=1;
    players[num_of_players-1] = socket;
    let player_name = '';
    if (num_of_players === 1) {
        player_name="first";
    } else {
        player_name="second";
    }
    socket.emit("event", "Welcome to Tic Tac Toe Game");
    socket.emit("event", `Game started. You are the ${player_name} player.`);
    socket.emit("event", "The Tic Tac Toe Board will be like this.");    
    board_str=" --------------------------------------------\n      1              2               3\n      4              5               6\n      7              8               9\n--------------------------------------------\n";  
    socket.emit("event", board_str);    
  }

  // Need to start the game when number of players is 2
  if (num_of_players == 2) {
    tic_tac_toe_board.display(function(data) {
      io.emit("msg", data);
    });
    players[0].emit("event", `Make your move`); //Send message to first player if the second player has joined
  }

    
    
    
    /**
     * This Portion is check the move and it pritn X or O based on the player
     * It gets the player who should make a move next
     * Check for winning or Draw of a match
     * It emits message for next player
     */
    
  // When a player makes a move 
  socket.on("entry", function(msg) {
    // Need to check whether the game is over
    if (is_won) {
      socket.emit("msg", "Game Over! Type 'r' to exit");
    } // Need to check whether player is moving when he is not supposed to
    else if (socket.id != players[player_turn].id) {
      socket.emit("msg", "Wait for your turn");
    }
    else {
      //  Output to tic_tac_toe_board
        const reponse_from_move=tic_tac_toe_board.makeMove(players[0].id == socket.id ? "X" : "O", msg);
      if (reponse_from_move == "") {
        // Check for next player
        player_turn = (player_turn + 1) % 2;
        // Display the tic_tac_toe_board
        tic_tac_toe_board.display(function(a) {
          io.emit("msg", a);
        });
        // Notify player for their move
        players[player_turn].emit("msg", "Make your move");
      } else {
        // Check the move is won or draw
          if (reponse_from_move[1] === "win" || reponse_from_move[1]=== "draw") {
          io.emit("msg", reponse_from_move[0]);
            is_won = true;

          players[0].disconnect();
          players[1].disconnect();

          num_of_players = 0;
          players = [null, null];

          tic_tac_toe_board.reset();
        } else socket.emit("msg", reponse_from_move[0]);
      }
    }
  });

    
    
  /**
   * This portion is to disconnect the player from the Game and announce the winner
   */
  // Disconnect the player if the other player is resigned from the game
  socket.on("disconnect", function() {
    if (is_won == false) {
      io.emit("msg", `The other player resigned from the game, you won!`);
      players[0].disconnect();
      players[1].disconnect();
      tic_tac_toe_board.reset();
    }

    num_of_players = 0;
    is_won = false;
  });
});


const port=process.env.PORT||5050;
/**
 * Prints the server listening port
 */
http.listen(port, function() {
  console.log("listening on *:" + port);
});

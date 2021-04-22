const utils = require("./utils");
let tic_tac_toe_board=[".", ".", ".", ".", ".", ".", ".", ".", "."];
let move_count = 0;
let winner = "null";



// prints the current tic_tac_toe_board
exports.display=fn => {
    const render_result=utils.getBoardDisplay(tic_tac_toe_board);
    fn(render_result);
};



// Reseting the tic_tac_toe_board
exports.reset = () => {
  tic_tac_toe_board = [".", ".", ".", ".", ".", ".", ".", ".", "."];
  winner = "null";
  move_count = 0;
};



/**
 * 
 * @param {*} player - Active Player
 * @param {*} position - The position that player want to move
 * Returns 5 possibilities
 * if winner is not null - Then  player is already won the game
 * if move_count is = or > 9, then the match is already done and it is a draw
 * if this poistion is alredy moved, then it is a invalid move
 * if all the check success positions are met for that player, then it is win move
 * else it is just a move
 */
exports.makeMove=(player, position) => {
  if (winner != "null") {
    return [`player ${winner} already won`, 'win'];
  } else if (tic_tac_toe_board[position-1]!=".") {
      return ["invalid move", 'invalid'];
  } else if (move_count >= 9 && winner == "null") {
      return ["Game is tied.", 'draw'];
  } else {
    tic_tac_toe_board[position - 1] = player == "X" ? "X" : "O";
    move_count++;
    if (utils.checkIsWon(tic_tac_toe_board)) {
      winner = player;
      return [`Game won by ${player === 'X' ? 'first' : 'second'} player.`, 'win'];
    } else if (move_count >= 9) {
        return ["Game is tied.", 'draw'];
    } else {
      return "";
    }
  }
};

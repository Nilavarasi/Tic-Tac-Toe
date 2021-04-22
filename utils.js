
/**
 * Returns true is the player won the game 
 * else returns false
 */
exports.checkIsWon=(tic_tac_toe_board) => {
	/**
	* Winning Positions - (0,1,2) or (3,4,5) or (6,7,8) or
	* 	(0,3,6) or (1,4,7) or (2,5,8) or (0,4,8) or  (2,4,6)
	*/
	if (
		(tic_tac_toe_board[0]==tic_tac_toe_board[1]&&tic_tac_toe_board[1]==tic_tac_toe_board[2]&&tic_tac_toe_board[0]!=".")||
		(tic_tac_toe_board[3]==tic_tac_toe_board[4]&&tic_tac_toe_board[4]==tic_tac_toe_board[5]&&tic_tac_toe_board[3]!=".")||
		(tic_tac_toe_board[6]==tic_tac_toe_board[7]&&tic_tac_toe_board[7]==tic_tac_toe_board[8]&&tic_tac_toe_board[6]!=".")||
		(tic_tac_toe_board[0]==tic_tac_toe_board[3]&&tic_tac_toe_board[3]==tic_tac_toe_board[6]&&tic_tac_toe_board[0]!=".")||
		(tic_tac_toe_board[1]==tic_tac_toe_board[4]&&tic_tac_toe_board[4]==tic_tac_toe_board[7]&&tic_tac_toe_board[1]!=".")||
		(tic_tac_toe_board[2]==tic_tac_toe_board[5]&&tic_tac_toe_board[5]==tic_tac_toe_board[8]&&tic_tac_toe_board[2]!=".")||
		(tic_tac_toe_board[0]==tic_tac_toe_board[4]&&tic_tac_toe_board[4]==tic_tac_toe_board[8]&&tic_tac_toe_board[0]!=".")||
		(tic_tac_toe_board[2]==tic_tac_toe_board[4]&&tic_tac_toe_board[4]==tic_tac_toe_board[6]&&tic_tac_toe_board[2]!=".")
	) {
		return true;
	}
	return false;
};

/**
 * 
 * @param {*} tic_tac_toe_board  - Str - Current state of the board
 * Returns - str - To display the elements of the board
 * Sample Result
*       X O X
        O X O
        .   .   .
 */
exports.getBoardDisplay=(tic_tac_toe_board) => {
    let render_str="\n";
    let i=1;
    while (i<=9) {
        render_str+=tic_tac_toe_board[i-1]+" ";
        if (i%3===0) {
            render_str+="\n";
        }
        i+=1;
    }
    render_str+="\n--------------------------------------------";
    return render_str;
};
/**
 * Accepts the board and the new move and checks if move is valid and there is a connect4 or not
 * @param {Array[6][7]} board
 * @param {integer} column
 * @param {integer} player
 * @returns {Array[3]} row, column and victory
 */
module.exports = (board, column, player) => {
    //check if move is invalid

    //find the row to which the coin must be added
    let row = 5;
    while (row > 0 && (typeof board[row][column] == 'number'))
        row--;
    //add the coin
    //console.log(board);
    board[row][column] = player;
    //console.log(board);
    return [row, column, areFourConnected(board, player)];
}
/**
 * checks victory condition for the player
 * @param {Array[6][7]} board 
 * @param {integer} player 
 * @returns {boolean} true if victory or else false
 */
function areFourConnected(board, player) {

    // horizontalCheck 
    for (let j = 0; j < 7 - 3; j++) {
        for (let i = 0; i < 6; i++) {
            if (board[i][j] == player && board[i][j + 1] == player && board[i][j + 2] == player && board[i][j + 3] == player) {
                return true;
            }
        }
    }

    // verticalCheck
    for (let i = 0; i < 6 - 3; i++) {
        for (let j = 0; j < 7; j++) {
            if (board[i][j] == player && board[i + 1][j] == player && board[i + 2][j] == player && board[i + 3][j] == player) {
                return true;
            }
        }
    }

    // ascendingDiagonalCheck 
    for (let i = 3; i < 6; i++) {
        for (let j = 0; j < 7 - 3; j++) {
            if (board[i][j] == player && board[i - 1][j + 1] == player && board[i - 2][j + 2] == player && board[i - 3][j + 3] == player)
                return true;
        }
    }

    // descendingDiagonalCheck
    for (let i = 3; i < 6; i++) {
        for (let j = 3; j < 7; j++) {
            if (board[i][j] == player && board[i - 1][j - 1] == player && board[i - 2][j - 2] == player && board[i - 3][j - 3] == player)
                return true;
        }
    }
    return false;
}
/**
 * Accepts the moves from DB and regenerates a board
 * @param {Row[]} moves 
 * @returns {Array[6][7]} the board with empty for none, 0 for Yellow and 1 for Red
 */
module.exports = (moves) => {
    let board = [Array(7), Array(7), Array(7), Array(7), Array(7), Array(7)];
    moves.forEach(move => {
        board[move['row']][move['column']] = move['player'];
    });
    return board;
}
const assert = require('assert');
const checkMove = require('../src/lib/checkMove');
describe('checkMove', function () {
    it('should return 0 when there is a valid move', function () {
        let board = [Array(7), Array(7), Array(7), Array(7), Array(7), Array(7)]
        assert.strictEqual(checkMove(board, 0, 0)[2], false);
    });
    it('should return 1 when there is a valid connect in column', function () {
        let board = [Array(7), Array(7), Array(7), Array(7), Array(7), Array(7)]
        board[5][0] = board[4][0] = board[3][0] = 1;
        assert.strictEqual(checkMove(board, 0, 1)[2], true);
    });
    it('should return 1 when there is a valid connect in row', function () {
        let board = [Array(7), Array(7), Array(7), Array(7), Array(7), Array(7)]
        board[5][0] = board[5][1] = board[5][2] = 1;
        assert.strictEqual(checkMove(board, 3, 1)[2], true);
    });
    it('should return 0 when there is no valid connect in column', function () {
        let board = [Array(7), Array(7), Array(7), Array(7), Array(7), Array(7)]
        board[5][0] = board[4][0] = 1;
        assert.strictEqual(checkMove(board, 0, 1)[2], false);
    });
    it('should return 0 when there is no a valid connect in row', function () {
        let board = [Array(7), Array(7), Array(7), Array(7), Array(7), Array(7)]
        board[5][0] = board[5][1] = 1;
        assert.strictEqual(checkMove(board, 2, 1)[2], false);
    });

});
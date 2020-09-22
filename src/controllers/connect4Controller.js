const { v4: uuidv4 } = require('uuid');
const knex = require('../knex');
const recreateBoard = require('../lib/recreateBoard');
const checkMove = require('../lib/checkMove');
const e = require('express');
module.exports = {
    /**
     * Starts a connect4 game and sends back a game token
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise}
     */
    async start(req, res) {
        //Generate game token
        const token = uuidv4();
        //write to db
        await knex.table('games').insert({
            token: token,
            ended: false,
            created_at: new Date(),
            updated_at: new Date()
        });
        //Start Game by sending a response
        res.json({
            ready: true,
            token: token
        });
    },
    /**
     * Play a move
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise}
     */
    async move(req, res) {
        //get game token
        const token = req.query.token;
        //check game status
        let game = await knex.table('games').where('token', token).andWhere('ended', false).first();
        //get column value
        const column = req.query.column;
        //retrieve previous moves
        let moves = await knex.table('moves').where('game_token', token).orderBy('created_at', 'desc');

        //check current player
        let player = parseInt(req.query.player);
        let currentPlayer = 0;
        if (moves.length > 0)
            currentPlayer = (moves[0].player + 1) % 2;
        else if (player != NaN) {
            currentPlayer = player;
        }

        //check if game is invalid or move is invalid
        if (!game || column < 0 || column > 6 || player != currentPlayer) {
            res.json({ valid: false, player: currentPlayer, message: "Invalid Move" });
            return;
        }

        //recreate board from moves
        let board = recreateBoard(moves);

        //check if column is full
        if ((typeof board[0][column] == 'number')) {
            res.json({ valid: false, player: currentPlayer, message: "Invalid Move" });
            return;
        }

        //check if it is victory move
        let boardRes = checkMove(board, column, currentPlayer);

        //insert move to db
        await knex.table('moves').insert({
            game_token: token,
            player: currentPlayer,
            row: boardRes[0],
            column: boardRes[1],
            created_at: new Date(),
            updated_at: new Date()
        });

        if (boardRes[2]) {
            //show victory message
            res.json({ valid: true, victory: true, player: currentPlayer, message: (currentPlayer ? "Yellow wins" : "Red wins") });
            await knex.table('games').where('token', token).update({ ended: true, victory: currentPlayer, updated_at: new Date() });
        } else if (moves.length >= 41) {
            //show draw message
            res.json({ valid: true, draw: true, player: currentPlayer, message: "Draw" });
            await knex.table('games').where('token', token).update({ ended: true, victory: 2 });
        } else {
            //show valid move
            res.json({ valid: true, player: currentPlayer, message: "Valid Move" });
        }
    }
}
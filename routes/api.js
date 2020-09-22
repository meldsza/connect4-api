const express = require('express');
let router = express.Router();

//For the sake of convenience, I have made these as get routes. Normally these should
//be post routes as per REST standards

//route to start game
router.get('/start', require('../src/controllers/connect4Controller').start);

//route to make a move
router.get('/move', require('../src/controllers/connect4Controller').move);

module.exports = router

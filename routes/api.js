const { response } = require('express');
const express = require('express');
let router = express.Router();
let path = require('path');

//For the sake of convenience, I have made these as get routes. Normally these should
//be post routes as per REST standards

//route to start game
router.all('/start', require('../src/controllers/connect4Controller').start);

//route to make a move
router.all('/move', require('../src/controllers/connect4Controller').move);
router.all('/', (req, res) => {
    res.sendFile(path.resolve('./README.txt'));
});

module.exports = router

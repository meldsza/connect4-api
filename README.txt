Prerequisites
===============
1. Node.JS
2. NPM

Installation
===============
1. Run the following commands:
        npm install

Execution
===============
1. Configure the database using a .env file with the database credentials.
2. Run the following command:
        npm start

API Details
===============
There are two routes:

1. /start
    Creates a game and sends back the token. It accepts no arguments
2. /move
    Plays a move.
    You need to pass the following as query parameters:
        1. player: which player is moving (0,1)
        2. token: Game token
        3. column: which column to insert at
    
You can find this api hosted at: https://pratillipi-hackerearth-meldsza.herokuapp.com/
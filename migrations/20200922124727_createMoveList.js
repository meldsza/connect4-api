
exports.up = function (knex) {
    return knex.schema
        .createTable('moves', function (table) {
            //add reference to game using game token
            table.uuid('game_token').notNullable();
            table.foreign('game_token').references('games.token')
            //store the move
            table.integer('player', 1);
            table.integer('row', 1);
            table.integer('column', 1);
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('moves');
};

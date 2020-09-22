
exports.up = function (knex) {
    return knex.schema
        .createTable('games', function (table) {
            //store game token
            table.uuid('token').notNullable().primary();
            //store state of game
            table.boolean('ended').default(false);
            //victory state: 0 for Blue, 1 for Red and 2 for Draw
            table.integer('victory', 1).nullable();
            //timestamps for the game
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('games');
};

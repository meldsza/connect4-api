//Load configuration using dotenv
require('dotenv').config()

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true
  },
  production: {
    client: process.env.DATABASE_TYPE || 'postgresql',
    connection: process.env.DATABASE_URL || {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      database: process.env.DATABASE_NAME || 'my_db',
      user: process.env.DATABASE_USERNAME || 'username',
      password: process.env.DATABASE_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

//Configure knex and export it
let config = require('../knexfile');
let currentConfigEnv = config[process.env.NODE_ENV || 'development']
module.exports = require('knex')(currentConfigEnv || config['development'])
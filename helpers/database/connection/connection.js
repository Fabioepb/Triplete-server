const config = require('../../config/config');
const pgp = require('pg-promise')();
const db = pgp(config.connection);

module.exports = db;
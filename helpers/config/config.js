const config = {
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'triplete-db2',
    user: 'postgres',
    password: 'masterkey',
    max: 20,
    min: 5
  },
  port: 3500,
  secretOrKey: 'PlusUltra',
  saltRounds: 10
}

module.exports = config;
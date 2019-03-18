const preparedStatement = require('pg-promise').preparedStatement;
const queries = {
  findUser: new preparedStatement('find-user', 'select * from users where users_username = $1'),
  signUp: new preparedStatement('login-user', 'insert into users' +
  + '(users_username, users_name, users_ password, users_email) values ($1, $2, $3, $4, $5)'),
}

module.exports = queries;
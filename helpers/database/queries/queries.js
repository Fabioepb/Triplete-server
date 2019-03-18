const preparedStatement = require('pg-promise').PreparedStatement;
const queries = {
  findUser: new preparedStatement('find-user', 'select * from users where users_username = $1'),
  signUp: new preparedStatement('login-user', 
  'insert into users (users_username, users_name, users_password, users_email, type_users_id) values($1, $2, $3, $4, 2)'),
}

module.exports = queries;
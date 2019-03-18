const dbApi = require('../../../helpers/database/Api/dbApi');
const jws = require('jsonwebtoken');
const config = require('../../../helpers/config/config');
const bcrypt = require('bcrypt');

exports.signup = async (req, res, next) => {
  try {
    const { username, name, password, email } = req.body;
    let _password = await bcrypt.hash(password, config.saltRounds); //bcrypt.hash return a promise with the new password
    await dbApi.signUp(username, name, _password, email);
    res.status(201).json({ status: 201, message: 'Registered User' });
  } catch (error) {
    badResponse(error, res);
  }
}

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await dbApi.findUser(username);
    const match = await bcrypt.compare(password, user.users_password);
    if (match) {
      const payload = {
        username: user.users_username,
        id: user.users_id,
        type: user.type_users_id
      };
      const token = jws.sign(payload, config.secretOrKey);
      res.status(200).json({status:200, username, token, message: 'Loged User'});
    } else {
      res.status(200).json({status: 401, message: 'Incorrect Password or Username'});
    }
  } catch (error) {
    badResponse(error, res);
  }
}


function badResponse(error, res) {
  console.log(error);
  res.status(500).json({error});
}
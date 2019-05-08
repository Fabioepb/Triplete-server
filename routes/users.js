const express = require('express');
const router = express.Router();
const {signup, login} = require('./Api/user/user.helper');


/* GET users listing. */
router.route('/login').post(login);
router.route('/signup').post(signup);

module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('../auth/passport')
const { updateUser, getUserData } = require('./Api/profile-helper');

/* GET users listing. */
router.route('/profile').put( passport.authenticate('jwt', {session: false}) ,updateUser).get(passport.authenticate('jwt', {session: false}) ,getUserData);

module.exports = router;

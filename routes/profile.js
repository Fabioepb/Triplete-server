const express = require('express');
const router = express.Router();
const passport = require('../auth/passport')
const { updateUser } = require('./Api/profile-helper');

/* GET users listing. */
router.route('/profile').put( passport.authenticate('jwt', {session: false}) ,updateUser);

module.exports = router;

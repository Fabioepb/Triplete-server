const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');
const { postBet } = require('./Api/bet-helper');

router.route('/bet').post(passport.authenticate('jwt', { session: false }), postBet);


module.exports = router;
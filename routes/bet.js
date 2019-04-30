const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');
const { postBet, getBets, getAllBets } = require('./Api/bet-helper');

router.route('/bet').post(passport.authenticate('jwt', { session: false }), postBet).get(passport.authenticate('jwt', {session: false}) ,getAllBets);
router.route('/bets/:range/:date').get(passport.authenticate('jwt', {session: false}) ,getBets);


module.exports = router;
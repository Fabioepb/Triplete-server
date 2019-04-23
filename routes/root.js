const express = require('express');
const router = express.Router();
const user = require('./users');
const api = require('./Api');
const profile = require('./profile');
const bet = require('./bet');

// Here goes all the routes used at the backend
router.use(user);
router.use(api);
router.use(profile);
router.use(bet);

module.exports = router;

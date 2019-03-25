const express = require('express');
const router = express.Router();
const user = require('./users');
const api = require('./Api');

// Here goes all the routes used at the backend
router.use(user);
router.use(api);

module.exports = router;

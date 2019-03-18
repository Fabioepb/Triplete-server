const express = require('express');
const router = express.Router();
const user = require('./users');

// Here goes all the routes used at the backend
router.use(user);

module.exports = router;

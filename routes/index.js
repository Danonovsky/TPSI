var express = require('express');
var router = express.Router();
var user = require('./user');
var people = require('./people');
router.use('/user', user);
router.use('/people',people);
module.exports = router;
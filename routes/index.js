var express = require('express');
var router = express.Router();
var user = require('./user');
var people = require('./people');
var meetings = require('./meetings');
router.use('/user', user);
router.use('/people', people);
router.use('/meetings', meetings);
module.exports = router;
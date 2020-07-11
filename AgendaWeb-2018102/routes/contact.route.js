'use strict'

var express = require('express');
var contactController = require('../controllers/contact.controller');

var api = express.Router();

api.post('/saveContact', contactController.saveContact);

module.exports = api;
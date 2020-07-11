'use strict'

var express = require('express');
var userController = require('../controllers/user.controller');

var api = express.Router();

api.get('/testController', userController.prueba);
api.post('/saveUser', userController.saveUser);
api.get('/getUsers', userController.getUsers);
api.get('/getUser/:id', userController.getUser);
api.put('/updateUser/:id', userController.updateUser);
api.delete('/deleteUser/:id', userController.removeUser);

/* RUTAS USER-CONTACT */
api.put('/:id/setContact', userController.setContact);
api.put('/:idU/updateContact/:idC', userController.updateContact);
api.put('/:idU/removeContact/:idC', userController.removeContact);
api.post('/login', userController.login);

module.exports = api;
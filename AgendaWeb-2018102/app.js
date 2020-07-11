'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var userRoutes = require('./routes/user.route');
var contactRoutes = require('./routes/contact.route');

var app = express();

//Parseo de js a json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*Ruta y método de prueba
app.get('/prueba', (req, res)=>{
	res.status(200).send({message: 'Hola mundo'});
});*/




//Configuración de CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/v3', userRoutes);
app.use('/v1', contactRoutes);

module.exports = app;
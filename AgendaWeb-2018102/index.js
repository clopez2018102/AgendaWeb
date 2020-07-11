'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/agendaWebDB', {useNewUrlParser: true, useUnifiedTopology:true })
    .then(()=>{
        console.log('Conexion correcta a la base de datos');
        app.listen(port, ()=>{
            console.log('El servidor está corriendo en el puerto: ', port);
        });

    })
    .catch(err=>{
        console.log('Error al conectarse a la base de datos, ', err);
    });

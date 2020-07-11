'use strict'
//Importación del modelo de contacto
var Contact = require('../models/contact.model');

function saveContact(req, res){
    //Instacia del contacto
    var contact = new Contact();
    //Capturo los dato
    var params = req.body;
    //Validación de que me lleguen los datos
    if(params.name && params.phone){
        Contact.findOne({phone: params.phone}, (err, phoneExist)=>{
            if(err){
                res.status(500).send({message: 'Error general', err});
            }else if(phoneExist){
                res.status(200).send({message: 'Ya existe un usuario con ese número'});
            }else{
                contact.name = params.name;
                contact.lastname = params.lastname;
                contact.phone = params.phone;

                contact.save((err, contactSaved)=>{
                    if(err){
                        res.status(500).send({message: 'Error general'});
                    }else if(contactSaved){
                        res.status(200).send({contact: contactSaved});
                    }else{
                        res.status(404).send({message: 'Contacto no guardado'});
                    }
                });
            }
        });
    }else{
        res.status(200).send({message: 'Ingresa todos los campos obligatorios'});
    }
}

module.exports = {
    saveContact
}
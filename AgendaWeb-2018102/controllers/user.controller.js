'use strict'

var User = require('../models/user.model');
var Contact = require('../models/contact.model');

function login(req, res){
    let params = req.body;
    if(params.email && params.password){
        User.findOne({email:params.email, password:params.password}, (err, user)=>{
            if(err){
                res.status(500).send({message:'Error general en el servidor.'});
            }else if(user){
                res.send({user:user});
            }else{
                res.status(404).send({message:'ERROR. El email o el password son incorrectos.'});
            }
        });
    }else{
        res.status(200).send({message: 'Ingresa todos los datos'});
    }

    
}

function prueba(req, res){
    res.status(200).send({message: 'Ruta de acceso desde el controlador'});
}

function saveUser(req, res){
    var user = new User();
    var params = req.body;

    if(params.name && params.lastname && params.username && params.password && params.email){

        User.findOne({username: params.username}, (err, usernameFind)=>{
            if(err){
                res.status(500).send({message: 'Errror general', err});
            }else if(usernameFind){
                res.status(200).send({message: 'Nombre de usuario ya en uso'});
            }else{
                user.name = params.name;
                user.lastname = params.lastname;
                user.username = params.username;
                user.password = params.password;
                user.email = params.email;

                user.save((err, userSaved)=>{
                    if(err){
                        res.status(500).send({message:'Error general en el servidorm, intente de nuevo mas tarde'});
                    }else{
                        if(userSaved){
                            res.status(200).send({user: userSaved});
                        }else{
                            res.status(200).send({message: 'Error, usuario no guardado'});
                        }
                    }

                });
            }
        });

        
    }else{
        res.status(200).send({message: 'Ingresa todos los campos requeridos'});
    }
}

function getUsers(req, res){
    User.find({}).exec((err, users)=>{
        if(err){
            res.status(500).send({message:'Error en el servidor'});
        }else{
            if(users){
                res.status(200).send({users: users});
            }else{
                res.status(200).send({message: 'No hay registros'});
            }
        }
    });
}


function getUser(req, res){
    let userId = req.params.id;

    User.findById(userId).exec((err, user)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else{
            if(user){
                res.status(200).send({user: user});
            }else{
                res.status(404).send({message: 'Sin datos que mostrar'});
            }
        }
    });

}

function updateUser(req, res){
    let userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, {new: true},(err, userUpdated)=>{
        if(err){
            res.status(500).send({message:'Error general'});
        }else{
            if(userUpdated){
                res.status(200).send({user: userUpdated});
            }else{
                res.status(404).send({message: 'No se actualizó'});
            }
        }
    });
}

function removeUser(req, res){
    let userId = req.params.id;
    User.findByIdAndRemove(userId, (err, userRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(userRemoved){
            res.status(200).send({message: 'Cuenta eliminada', userRemoved})
        }else{
            res.status(404).send({message: 'No se eliminó de la BD'});
        }
    });

}

/* FUNCIONES USER-CONTACTS  (Documentos embedidos)*/

function  setContact(req, res){
    let userId = req.params.id;
    let paramsContact = req.body;
    let contact = new Contact();

    User.findById(userId, (err, userOk)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(userOk){
            if(paramsContact.name && paramsContact.phone){
                contact.name = paramsContact.name;
                contact.lastname = paramsContact.lastname;
                contact.phone = paramsContact.phone;

                User.findByIdAndUpdate(userId, {$push:{contacts: contact}}, {new:true},(err, userUpdated)=>{
                    if(err){
                        res.status(500).send({message: 'Error general'});
                    }else if(userUpdated){
                        res.send({user: userUpdated});
                    }else{
                        res.status(404).send({message: 'Usuario no actualizado'});
                    }
                });
            }else{
                res.status(200).send({message: 'Ingese los datos minimos para agregar un contacto'});
            }
        }else{
            res.status(404).send({message: 'Usuario inexistente'});
        }
    });
}

function updateContact(req, res){
    let userId = req.params.idU;
    let contactId = req.params.idC;
    let update = req.body;

    User.findOne({_id:userId}, (err, userOk)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(userOk){
            User.findOneAndUpdate({_id:userId, "contacts._id": contactId}, 
            {"contacts.$.name": update.name,
            "contacts.$.lastname": update.lastname,
            "contacts.$.phone": update.phone} ,{new: true} ,(err, userUpdated)=>{
                if(err){
                    res.status(500).send({message: 'Error general'});
                }else if(userUpdated){
                    res.send({user: userUpdated});
                }else{
                    res.status(418).send({message: 'Contacto no actualizado'});
                }
            });
        }else{
            res.status(404).send({message: 'Usuario inexistente o contacto no encontrado'});
        }
    });

}

function removeContact(req, res){
    let userId = req.params.idU;
    let contactId = req.params.idC;

    User.findOneAndUpdate({_id: userId, "contacts._id":contactId}, 
    {$pull:{contacts:{_id:contactId}}}, {new:true}, (err, userUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(userUpdated){
            res.send({user: userUpdated});
        }else{
            res.status(418).send({message: 'Contacto no eliminado'});
        }
    });

}






module.exports = {
    login,
    prueba,
    saveUser,
    getUsers,
    getUser,
    updateUser,
    removeUser,
    setContact,
    updateContact,
    removeContact
}
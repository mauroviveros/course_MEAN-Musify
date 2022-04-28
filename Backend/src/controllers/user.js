'use strict';

const bcrypt = require('bcrypt-nodejs');
const User = require('./../models/user');

function pruebas(req, res){
  res.status(200).send({
    message: "Probando una acción del controllador de Usuarios del API-REST"
  });
};

function saveUser(req, res){
  const user = new User();
  const params = req.body;

  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.role = "ROLE_USER";

  if(!user.name || !user.surname || !user.email){
    res.status(400).send({ message: "Rellena todos los campos" });
  };

  if(params.password){
    // Encriptar contraseña y guardar datos
    bcrypt.hash(params.password, null, null, function(err, hash){
      user.password = hash;

      user.save(function(err, userStored){
        if(err) res.status(500).send({ message: "Error al guardar el usuario" });
        else if(!userStored) res.status(400).send({ message: "No se ha registrado el usuario" });
        else res.status(200).send({ user: userStored });
      });
    });
  } else{
    res.status(400).send({ message: "Introduce una contraseña" });
  };
};

module.exports = {
    pruebas,
    saveUser
};
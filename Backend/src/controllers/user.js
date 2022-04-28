'use strict';

const bcrypt = require('bcrypt-nodejs');
const JWT = require('./../services/jwt');
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
  user.email = !!params.email ? params.email.toLowerCase() : undefined;
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

function loginUser(req, res){
  const params = req.body;

  const email = !!params.email ? params.email.toLowerCase() : undefined;
  const password = params.password;

  User.findOne({ email }, function(err, userDB){
    if(err) res.status(500).send({ message: "Error al obtener el usuario" });
    else if(!userDB) res.status(400).send({ message: "No existe el usuario" });
    else{
      bcrypt.compare(password, userDB.password, function(err, check){
        if(!check) res.status(403).send({ message: "Contraseña incorrecta" });
        else if(err) res.status(500).send({ message: "Error al obtener el usuario" });
        else if(params.hash) res.status(200).send({ token: JWT.createToken(userDB) });
        else res.status(200).send({ user: userDB });
      });
    }
  })
};

module.exports = {
    pruebas,
    saveUser,
    loginUser
};
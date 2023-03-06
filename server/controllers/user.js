'use strict';

const bcrypt = require('bcrypt');
const JWT = require('./../services/jwt');
const User = require('./../models/user');

function pruebas(req, res){
  res.status(200).send({
    message: "Probando una acción del controllador de Usuarios del API-REST"
  });
};

async function saveUser (req, res){
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
    try {
      // Encriptar contraseña y guardar datos
      user.password = await bcrypt.hash(params.password, 10);
      const userStored = await user.save();

      if(!userStored) res.status(400).send({ message: "No se ha registrado el usuario" });
      else res.status(200).send({ user: userStored });
    } catch(error){
      res.status(500).send({ message: "Error al guardar el usuario", error });
    };
  } else{
    return res.status(400).send({ message: "Introduce una contraseña" });
  };
};

async function loginUser(req, res){
  const params = req.body;
  const email = !!params.email ? params.email.toLowerCase() : undefined;
  const password = params.password;

  try{
    const userDB = await User.findOne({ email });
    if(!userDB) throw new Error({ message: "No existe el usuario" });

    const check = await bcrypt.compare(password, userDB.password);
    if(!check) throw new Error({ message: "Contraseña incorrecta" });

    if(params.hash) res.status(200).send({ token: JWT.createToken(userDB) });
    else res.status(200).send({ user: userDB });
  } catch(error){
    return res.status(500).send({ message: "Error al obtener el usuario", error });
  };

};

module.exports = {
    pruebas,
    saveUser,
    loginUser
};
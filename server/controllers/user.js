"use strict";

const bcrypt = require("bcrypt");
const JWT   = require("./../services/jwt");
const User  = require("./../models/user");
const path  = require("path");
const fs    = require("fs");

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
    if(!userDB) throw new Error("No existe el usuario");

    const check = await bcrypt.compare(password, userDB.password);
    if(!check) throw new Error("Contraseña incorrecta");

    if(params.hash) res.status(200).send({ token: JWT.createToken(userDB) });
    else res.status(200).send({ user: userDB });
  } catch(error){
    return res.status(500).send({ message: "Error al obtener el usuario", error: { message: error.message } });
  };

};

async function updateUser(req, res){
  const userID  = req.params._id;

  try{
    const userUPD = await User.findByIdAndUpdate(userID, req.body);
    return res.status(200).send({ user: userUPD });
  } catch(error){
    return res.status(500).send({ message: "Error al actualizar el usuario", error: { message: error.message } });
  }
};

async function uploadImage(req, res){
  const userID    = req.params._id;
  let file_name, file_ext;

  try {
    if(req.files){
      file_name = path.basename(req.files.image.path);
      file_ext  = path.extname(file_name);
    } else throw new Error("No has subido ninguna imagen...");

  

    if(file_ext === ".png" || file_ext === ".jpg" || file_ext === ".gif"){
      const userUPD = await User.findByIdAndUpdate(userID, { image: file_name });
      return res.status(200).send({ user: userUPD });
    } else throw new Error("Extension del archivo no valida");
  } catch(error){
    return res.status(500).send({ message: "Error al actualizar la imagen del usuario", error: { message: error.message } });
  };
};

async function getImage(req, res){
  const userID = req.params._id;

  try{
    const userDB = await User.findById(userID);
    if(!userDB) throw new Error("No existe el usuario");
    const path_file = `./uploads/users/${userDB.image}`;
    const imageBool = await fs.existsSync(path_file);

    if(!imageBool) throw new Error("No existe la imagen");

    res.sendFile(path.resolve(path_file));
  } catch(error){
    return res.status(500).send({ message: "Error al obtener la imagen del usuario", error: { message: error.message } });
  }
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImage
};
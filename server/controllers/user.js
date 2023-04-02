"use strict";

const bcrypt  = require("bcrypt");
const JWT     = require("./../services/jwt");
const User    = require("./../models/user");
const path    = require("path");
const fs      = require("fs");


async function getUser(req, res){
  try{
    const user = await User.findById(req.user._id);
    const token = await JWT.createToken(user);

    return res.json({ user, token });
  } catch(error){
    return res.status(400).send({ message: "Error al obtener el usuario", error: { message: error.message } });
  };
}

async function saveUser (req, res){
  try{
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    user.image = undefined;

    await user.save();
    return res.json({ user });
  } catch(error){
    res.status(500).send({ message: "Error al guardar el usuario", error: { message: error.message } });
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

    const response = { user: userDB };

    if(params.hash) response.token = JWT.createToken(userDB);
    return res.status(200).send(response);
  } catch(error){
    return res.status(400).send({ message: "Error al obtener el usuario", error: { message: error.message } });
  };

};

async function updateUser(req, res){
  const userID  = req.params._id;

  try{
    const userUPD = await User.findByIdAndUpdate(userID, req.body, { new: true });
    return res.status(200).send({ user: userUPD });
  } catch(error){
    return res.status(400).send({ message: "Error al actualizar el usuario", error: { message: error.message } });
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
      const userUPD = await User.findByIdAndUpdate(userID, { image: file_name }, { new: true });
      return res.status(200).send({ user: userUPD });
    } else throw new Error("Extension del archivo no valida");
  } catch(error){
    return res.status(400).send({ message: "Error al actualizar la imagen del usuario", error: { message: error.message } });
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
    return res.status(400).send({ message: "Error al obtener la imagen del usuario", error: { message: error.message } });
  }
}

module.exports = {
  getUser,
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImage
};

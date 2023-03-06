'use strict';

require('dotenv').config();
const JWT = require('jwt-simple');
const moment = require('moment');

function ensureAuth(req, res, next){
  if(!req.headers["authorization"]) return res.status(401).send({ message: "ACCESO DENEGADO" });
  const token = req.headers["authorization"];

  try{
    const payload = JWT.decode(token, process.env["JWT_SECRET"]);
    if(payload.exp <= moment().unix()) return res.status(401).send({ message: "ACCESO DENEGADO" });
    req.user = payload;
    next();
  } catch(ex){
    console.log(ex);
    return res.status(401).send({ message: "ACCESO DENEGADO" });
  };

  
};

module.exports = {
  ensureAuth
};
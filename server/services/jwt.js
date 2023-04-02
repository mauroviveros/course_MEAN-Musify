'use strict';

require('dotenv').config();
const JWT = require('jwt-simple');
const moment = require('moment');


function createToken(user){
  const payload = {
    _id: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  };

  return JWT.encode(payload, process.env["JWT_SECRET"]);
};




module.exports = {
  createToken
};

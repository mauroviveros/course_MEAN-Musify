'use strict';

function pruebas(req, res){
  res.status(200).send({
    message: "Probando una acción del controllador de Usuarios del API-REST"
  });
};

module.exports = {
    pruebas
};
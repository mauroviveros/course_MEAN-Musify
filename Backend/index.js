'use strict';

require('dotenv').config();


const colors = require('colors');

const APP = require('./src/express-server');
const MONGO = require('./src/mongo-connect');

const PORT =  process.env.PORT;


// Inicialización del servidor Express
APP.listen(PORT, ()=>{
  let url = `${colors.grey('http://localhost:')}${colors.blue(PORT)}`;
  console.log(`Servidor ${colors.green('ON')}: ${url}`);

}).on('error', (error) => {
  console.log(`${colors.red('Ocurrio un Error: ')}`, error.message)
});

// Inicialización a la conexión MongoDB
MONGO.then(()=>{
    let MongoDB = `${colors.grey('Mongo')}${colors.brightGreen('DB')}`;
    console.log(`${MongoDB}: ${colors.green('Conectado')}`);
}).catch((error)=>{
    console.log(error);
});
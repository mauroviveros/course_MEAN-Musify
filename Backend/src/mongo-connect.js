'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const MONGODB_SRV = process.env["MONGODB_SRV"];


// Configuración | Opciones, del MongoDB
const MONGODB_OPTS = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
};

module.exports = mongoose.connect(MONGODB_SRV, MONGODB_OPTS);
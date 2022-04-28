'use strict';

const express = require('express');

const UserCtrl = require("./../controllers/user");


const API = express.Router();

API.get('/test', UserCtrl.pruebas);
API.post('/register', UserCtrl.saveUser);
API.post('/login', UserCtrl.loginUser);

module.exports = API;
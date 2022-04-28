'use strict';

const express = require('express');

const UserCtrl = require('./../controllers/user');
const auth_md = require('./../middlewares/authenticated');


const API = express.Router();

API.get('/test', auth_md.ensureAuth, UserCtrl.pruebas);
API.post('/register', UserCtrl.saveUser);
API.post('/login', UserCtrl.loginUser);

module.exports = API;
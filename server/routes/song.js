"use strict";

const express = require("express");

const SongCtrl = require("../controllers/song");
const auth_md = require("../middlewares/authenticated");


const API = express.Router();

API.get("/songs", auth_md.ensureAuth, SongCtrl.getSong);

module.exports = API;
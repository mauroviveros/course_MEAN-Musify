"use strict";

const express = require("express");

const SongCtrl = require("../controllers/song");
const auth_md = require("../middlewares/authenticated");


const API = express.Router();

API.get("/songs", auth_md.ensureAuth, SongCtrl.getSongs);
API.get("/songs/:_id", auth_md.ensureAuth, SongCtrl.getSong);

API.post("/songs", auth_md.ensureAuth, SongCtrl.uploadSong);

module.exports = API;
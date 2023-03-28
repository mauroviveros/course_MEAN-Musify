"use strict";

const express = require("express");
const multipart = require("connect-multiparty");

const SongCtrl = require("../controllers/song");
const auth_md = require("../middlewares/authenticated");
const upload_md = multipart({ uploadDir: "./uploads/songs" });


const API = express.Router();

API.get("/songs", auth_md.ensureAuth, SongCtrl.getSongs);
API.get("/songs/:_id", auth_md.ensureAuth, SongCtrl.getSong);

API.post("/songs", auth_md.ensureAuth, SongCtrl.uploadSong);

API.put("/songs/:_id", auth_md.ensureAuth, SongCtrl.updateSong);

API.delete("/songs/:_id", auth_md.ensureAuth, SongCtrl.deleteSong);

API.get("/songs/:_id/file", SongCtrl.getFile);
API.post("/songs/:_id/file", [auth_md.ensureAuth, upload_md], SongCtrl.uploadFile);

module.exports = API;
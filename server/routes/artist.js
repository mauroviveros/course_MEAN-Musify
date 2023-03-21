"use strict";

const express = require("express");

const ArtistCtrl = require("../controllers/artist");
const auth_md = require("../middlewares/authenticated");


const API = express.Router();

API.get("/artists", auth_md.ensureAuth, ArtistCtrl.getArtists);
API.get("/artists/:_id", auth_md.ensureAuth, ArtistCtrl.getArtist);

API.post("/artists", auth_md.ensureAuth, ArtistCtrl.uploadArtist);

API.put("/artists/:_id", auth_md.ensureAuth, ArtistCtrl.updateArtist);

module.exports = API;
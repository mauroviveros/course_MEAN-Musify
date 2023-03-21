"use strict";

const express = require("express");

const ArtistCtrl = require("../controllers/artist");
const auth_md = require("../middlewares/authenticated");


const API = express.Router();

API.get("/artist/:_id", auth_md.ensureAuth, ArtistCtrl.getArtist);
API.post("/artist", auth_md.ensureAuth, ArtistCtrl.uploadArtist);

module.exports = API;
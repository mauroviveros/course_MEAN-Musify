"use strict";

const express = require("express");

const ArtistCtrl = require("../controllers/artist");
const auth_md = require("../middlewares/authenticated");


const API = express.Router();


API.get("/artist", auth_md.ensureAuth, ArtistCtrl.getArtist);

module.exports = API;
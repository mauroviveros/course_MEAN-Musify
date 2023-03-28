"use strict";

const express = require("express");

const AlbumCtrl = require("../controllers/album");
const auth_md = require("../middlewares/authenticated");


const API = express.Router();

API.get("/albums/:_id", auth_md.ensureAuth, AlbumCtrl.getAlbum);


module.exports = API;
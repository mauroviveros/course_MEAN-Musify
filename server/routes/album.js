"use strict";

const express = require("express");

const AlbumCtrl = require("../controllers/album");
const auth_md = require("../middlewares/authenticated");


const API = express.Router();

API.get("/albums", auth_md.ensureAuth, AlbumCtrl.getAlbums);
API.get("/albums/:_id", auth_md.ensureAuth, AlbumCtrl.getAlbum);

API.post("/albums", auth_md.ensureAuth, AlbumCtrl.uploadAlbum);

API.put("/albums/:_id", auth_md.ensureAuth, AlbumCtrl.updateAlbum);

API.delete("/albums/:_id", auth_md.ensureAuth, AlbumCtrl.deleteAlbum);


module.exports = API;
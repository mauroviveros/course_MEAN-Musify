"use strict";

const express = require("express");
const multipart = require("connect-multiparty");

const AlbumCtrl = require("../controllers/album");
const auth_md = require("../middlewares/authenticated");
const upload_md = multipart({ uploadDir: "./uploads/albums" });


const API = express.Router();

API.get("/albums", auth_md.ensureAuth, AlbumCtrl.getAlbums);
API.get("/albums/:_id", auth_md.ensureAuth, AlbumCtrl.getAlbum);

API.post("/albums", auth_md.ensureAuth, AlbumCtrl.uploadAlbum);

API.put("/albums/:_id", auth_md.ensureAuth, AlbumCtrl.updateAlbum);

API.delete("/albums/:_id", auth_md.ensureAuth, AlbumCtrl.deleteAlbum);

API.get("/albums/:_id/image", AlbumCtrl.getImage);
API.post("/albums/:_id/image", [auth_md.ensureAuth, upload_md], AlbumCtrl.uploadImage);

module.exports = API;
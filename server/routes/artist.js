"use strict";

const express = require("express");
const multipart = require("connect-multiparty");

const ArtistCtrl = require("../controllers/artist");
const auth_md = require("../middlewares/authenticated");
const upload_md = multipart({ uploadDir: "./uploads/artists" });


const API = express.Router();

API.get("/artists", auth_md.ensureAuth, ArtistCtrl.getArtists);
API.get("/artists/:_id", auth_md.ensureAuth, ArtistCtrl.getArtist);

API.post("/artists", auth_md.ensureAuth, ArtistCtrl.uploadArtist);

API.put("/artists/:_id", auth_md.ensureAuth, ArtistCtrl.updateArtist);

API.delete("/artists/:_id", auth_md.ensureAuth, ArtistCtrl.deleteArtist);

API.get("/artists/:_id/image", ArtistCtrl.getImage);
API.post("/artists/:_id/image", [auth_md.ensureAuth, upload_md], ArtistCtrl.uploadImage);

module.exports = API;
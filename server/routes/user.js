"use strict";

const express = require("express");
const multipart = require("connect-multiparty")

const UserCtrl = require("./../controllers/user");
const auth_md = require("./../middlewares/authenticated");
const upload_md = multipart({ uploadDir: "./uploads/users" });


const API = express.Router();

API.get("/test", auth_md.ensureAuth, UserCtrl.pruebas);
API.post("/register", UserCtrl.saveUser);
API.post("/login", UserCtrl.loginUser);
API.post("/user/:_id/image", [auth_md.ensureAuth, upload_md], UserCtrl.uploadImage);

API.put("/user/:_id", auth_md.ensureAuth, UserCtrl.updateUser);

module.exports = API;
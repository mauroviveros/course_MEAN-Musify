"use strict";

const express = require("express");
const multipart = require("connect-multiparty")

const UserCtrl = require("./../controllers/user");
const auth_md = require("./../middlewares/authenticated");
const upload_md = multipart({ uploadDir: "./uploads/users" });


const API = express.Router();

API.post("/register", UserCtrl.saveUser);
API.post("/login", UserCtrl.loginUser);


API.put("/user/:_id", auth_md.ensureAuth, UserCtrl.updateUser);

API.get("/user/:_id/image", UserCtrl.getImage);
API.post("/user/:_id/image", [auth_md.ensureAuth, upload_md], UserCtrl.uploadImage);


module.exports = API;
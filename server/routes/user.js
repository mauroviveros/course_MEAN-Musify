"use strict";

const express = require("express");
const multipart = require("connect-multiparty");

const UserCtrl = require("./../controllers/user");
const auth_md = require("./../middlewares/authenticated");
const upload_md = multipart({ uploadDir: "./uploads/users" });


const API = express.Router();

API.post("/register", UserCtrl.saveUser);
API.post("/login", UserCtrl.loginUser);

API.get("/user", auth_md.ensureAuth, UserCtrl.getUser);
API.put("/user", auth_md.ensureAuth, UserCtrl.updateUser);

API.get("/user/image", UserCtrl.getImage);
API.post("/user/image", [auth_md.ensureAuth, upload_md], UserCtrl.uploadImage);


module.exports = API;

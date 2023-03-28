"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const APP = express();

const user_routes   = require("./routes/user");
const artist_routes = require("./routes/artist");
const album_routes  = require("./routes/album");
const song_routes  = require("./routes/song");

APP.use(bodyParser.urlencoded({ extended: false }))
APP.use(bodyParser.json())

// Configurar Cabeceras HTTP
APP.use(function (req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// Cargas de Rutas Base
APP.use("/api", user_routes);
APP.use("/api", artist_routes);
APP.use("/api", album_routes);
APP.use("/api", song_routes);

APP.get("/pruebas", function(req, res){
    res.status(200).send({ message: "Bienvenido a Musify" });
});

module.exports = APP;
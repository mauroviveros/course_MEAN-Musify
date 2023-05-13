"use strict";

const express = require("express");
const cors    = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const APP = express();

const user_routes   = require("./routes/user");
const artist_routes = require("./routes/artist");
const album_routes  = require("./routes/album");
const song_routes  = require("./routes/song");

APP.use(bodyParser.urlencoded({ extended: false }))
APP.use(bodyParser.json())

// Configurar Cabeceras HTTP
APP.use(cors());


// Cargas de Rutas Base
APP.use("/api", user_routes);
APP.use("/api", artist_routes);
APP.use("/api", album_routes);
APP.use("/api", song_routes);

APP.get("/version", function(req, res){
  const { name, description, author, version } = require("../package.json");

  res.status(200).send({ name, description, author, version });
});

APP.use(express.static(path.join(__dirname, "../public")));
APP.use("*", (req, res)=>{ res.sendFile(path.join(__dirname, "../public/index.html")); });


module.exports = APP;

"use strict";

const path  = require("path");
const fs    = require("fs");

const Song  = require("../models/song");

async function getSong(req, res){
  res.send({ message: "Controllador de canción" });
};

module.exports = {
  getSong,
};
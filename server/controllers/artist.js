"use strict";

const path  = require("path");
const fs    = require("fs");

const Artist  = require("../models/artist");
const Album   = require("../models/album");
const Song    = require("../models/song");


async function getArtist(req, res){
  return res.status(200).send({ message: "Metodo getArtist" });
};

module.exports = {
  getArtist
}
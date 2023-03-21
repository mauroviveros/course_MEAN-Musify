"use strict";

const path  = require("path");
const fs    = require("fs");

const Artist  = require("../models/artist");
const Album   = require("../models/album");
const Song    = require("../models/song");


async function getArtist(req, res){
  try {
    const artistDB = await Artist.findById(req.params._id);
    return res.json(artistDB);
  } catch (error) {
    return res.status(error.status || 400).json(error);
  };
};

async function uploadArtist(req, res){
  const params  = req.body;
  const artist    = new Artist(params);
  artist.image  = undefined;

  try {
    const artistStored = await artist.save();
    return res.json(artistStored);
  } catch (error) {
    return res.status(error.status || 400).json(error);
  };

};

module.exports = {
  getArtist,
  uploadArtist
};
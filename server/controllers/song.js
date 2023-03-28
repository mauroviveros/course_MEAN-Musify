"use strict";

const path  = require("path");
const fs    = require("fs");

const Song  = require("../models/song");

async function getSong(req, res){
  try {
    const songDB = await Song.findById(req.params._id).populate({ path: "album", populate: { path: "artist" } }).exec();
    return res.json(songDB);
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener el detalle de la canción", error: { message: error.message } });
  };
};

async function uploadSong(req, res){
  const song   = new Song(req.body);
  song.file   = undefined;

  try {
    const songStored = await song.save();
    return res.json(songStored);
  } catch (error) {
    return res.status(400).json({ message: "Error al guardar la canción", error: { message: error.message } });
  };
};

module.exports = {
  getSong,
  uploadSong
};
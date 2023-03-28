"use strict";

const path  = require("path");
const fs    = require("fs");

const Song  = require("../models/song");

const populate = {
  path: "album",
  populate: {
    path: "artist"
  }
};

async function getSong(req, res){
  try {
    const songDB = await Song.findById(req.params._id).populate(populate).exec();
    return res.json(songDB);
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener el detalle de la canción", error: { message: error.message } });
  };
};

async function getSongs(req, res){
  const page  = req.query.page  || 1;
  const limit = req.query.limit || 10;

  try {
    const songsDB = await Song.paginate({}, { page, limit, populate });
    return res.json(songsDB);
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener el listado de canciones", error: { message: error.message } });
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

async function updateSong(req, res){
  try {
    delete req.body.image;
    const songUpdated = await Song.findByIdAndUpdate(req.params._id, req.body, { new: true });
    return res.json(songUpdated);
  } catch (error) {
    return res.status(400).json({ message: "Error al actualizar la canción", error: { message: error.message } });
  };
};

module.exports = {
  getSong,
  getSongs,
  uploadSong,
  updateSong
};
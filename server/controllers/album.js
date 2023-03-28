"use strict";

const Album   = require("../models/album");

async function getAlbum(req, res){
  try {
    const albumDB = await Album.findById(req.params._id).populate({ path: "artist" }).exec();
    return res.json(albumDB);
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener el detalle del album", error: { message: error.message } });
  };
};

async function uploadAlbum(req, res){
  const album   = new Album(req.body);
  album.image   = undefined;

  try {
    const albumStored = await album.save();
    return res.json(albumStored);
  } catch (error) {
    return res.status(400).json({ message: "Error al guardar el album", error: { message: error.message } });
  };
};

module.exports = {
  getAlbum,
  uploadAlbum
};
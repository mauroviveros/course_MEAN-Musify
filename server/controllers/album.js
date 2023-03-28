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

async function getAlbums(req, res){
  const page  = req.query.page  || 1;
  const limit = req.query.limit || 10;

  try {
    const albumsDB = await Album.paginate({}, { page, limit });
    return res.json(albumsDB);
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener el listado de albumes", error: { message: error.message } });
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

async function updateAlbum(req, res){
  try {
    delete req.body.image;
    const albumUpdated = await Album.findByIdAndUpdate(req.params._id, req.body, { new: true });
    return res.json(albumUpdated);
  } catch (error) {
    return res.status(400).json({ message: "Error al actualizar el album", error: { message: error.message } });
  };
};

module.exports = {
  getAlbum,
  getAlbums,
  uploadAlbum,
  updateAlbum
};
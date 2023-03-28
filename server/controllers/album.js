"use strict";

const Album   = require("../models/album");

async function getAlbum(req, res){
  try {
    const albumDB = await Album.findById(req.params._id);
    return res.json(albumDB);
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener el detalle del album", error: { message: error.message } });
  };
};

module.exports = {
  getAlbum
};
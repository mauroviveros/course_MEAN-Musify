"use strict";

const mongoosePaginate = require("mongoose-paginate-v2");
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

async function getArtists(req, res){
  const page  = req.query.page  || 1;
  const limit = req.query.limit || 10;

  try {
    const artistsDB = await Artist.paginate({}, { page, limit });
    return res.json(artistsDB);
  } catch (error) {
    return res.status(error.status || 400).json(error);
  }
}

async function uploadArtist(req, res){
  const artist    = new Artist(req.body);
  artist.image  = undefined;

  try {
    const artistStored = await artist.save();
    return res.json(artistStored);
  } catch (error) {
    return res.status(error.status || 400).json(error);
  };
};

async function updateArtist(req, res){
  try {
    delete req.body.image;
    const artistUpdated = await Artist.findByIdAndUpdate(req.params._id, req.body, { new: true });
    return res.json(artistUpdated);
  } catch (error) {
    return res.status(error.status || 400).json(error);
  };
};

async function deleteArtist(req, res){
  try {
    const artistDeleted = await Artist.findByIdAndDelete(req.params._id);
    if(!artistDeleted) throw { status: 400, message: "No existe el artista que desea eliminar" };

    const albumDeleted = await Album.findOneAndDelete({ artist: artistDeleted._id });
    if(albumDeleted) await Song.findOneAndDelete({ album: albumDeleted._id });

    return res.json({ status: 200, artist: artistDeleted });
  } catch (error) {
    return res.status(error.status || 400).json(error);
  }
};

module.exports = {
  getArtist,
  getArtists,
  uploadArtist,
  updateArtist,
  deleteArtist
};
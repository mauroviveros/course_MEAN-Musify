"use strict";

const path  = require("path");
const fs    = require("fs");

const Album   = require("../models/album");
const Song    = require("../models/song");

const populate = {
  path: "artist"
};

async function getAlbum(req, res){
  try {
    const albumDB = await Album.findById(req.params._id).exec();
    return res.json(albumDB);
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener el detalle del album", error: { message: error.message } });
  };
};

async function getAlbums(req, res){
  const paginationConfig = { populate };
  const paginationQuery = {};
  if(!!req.query.page) paginationConfig.page = req.query.page;
  if(!!req.query.limit) paginationConfig.limit = req.query.limit;
  if(!!req.query.artist) paginationQuery.artist = req.query.artist;


  try {
    const albumsDB = await Album.paginate(paginationQuery, paginationConfig);
    return res.json(albumsDB);
  } catch (error) {
    console.log(error);
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

async function deleteAlbum(req, res){
  try {
    const albumDeleted = await Album.findByIdAndDelete(req.params._id);
    if(!albumDeleted) throw new Error("No existe el album que desea eliminar");

    await Song.findOneAndDelete({ album: albumDeleted._id });

    return res.json({ status: 200, album: albumDeleted });
  } catch (error) {
    return res.status(400).json({ message: "Error al borrar el album", error: { message: error.message } });
  };
};

async function uploadImage(req, res){
  let file_name, file_ext;

  try {
    if(req.files){
      file_name = path.basename(req.files.image.path);
      file_ext  = path.extname(file_name);
    } else throw new Error("No has subido ninguna imagen...");

    if(file_ext === ".png" || file_ext === ".jpg" || file_ext === ".gif"){
      const albumUpdated = await Album.findByIdAndUpdate(req.params._id, { image: file_name }, { new: true });
      return res.send(albumUpdated);
    } else throw new Error("Extension del archivo no valida");
  } catch(error){
    return res.status(400).json({ message: "Error al actualizar la imagen del album", error: { message: error.message } });
  };
};

async function getImage(req, res){
  try{
    const albumDB = await Album.findById(req.params._id);
    if(!albumDB) throw new Error("No existe el album");
    let path_file = `./uploads/albums/${albumDB.image}`;
    const imageBool = await fs.existsSync(path_file);

    if(!imageBool) path_file = "./uploads/albums/empty.png";

    res.sendFile(path.resolve(path_file));
  } catch(error){
    return res.status(500).send({ message: "Error al obtener la imagen del album", error: { message: error.message } });
  };
};

module.exports = {
  getAlbum,
  getAlbums,
  uploadAlbum,
  updateAlbum,
  deleteAlbum,
  uploadImage,
  getImage
};

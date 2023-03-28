'use strict';

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Artist   = require("./artist");

const AlbumSchema = mongoose.Schema({
  name: { type: String, required: [true, "Rellena todos los campos"]},
  description: { type: String, required: [true, "Rellena todos los campos"]},
  year: { type: Number, required: [true, "Rellena todos los campos"]},
  image: { type: String },
  artist: { type: mongoose.Schema.ObjectId, ref: "Artist", required: [true, "Ingrese un artista Valido"]}
});

AlbumSchema.pre('save', async function(next) {
  try {
    const artist = await Artist.findById(this.artist);
    if (!artist) throw new Error('El Artista no existe');
    next();
  } catch (error) { next(error); }
});

AlbumSchema.pre('findByIdAndUpdate', async function(next) {
  try {
    const artist = await Artist.findById(this.getUpdate().$set.artist);
    if (!artist) throw new Error('El Artista no existe');
    next();
  } catch (error) {
    next(error);
  }
});

AlbumSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Album", AlbumSchema);
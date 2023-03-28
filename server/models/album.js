'use strict';

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const AlbumSchema = mongoose.Schema({
  name: { type: String, required: [true, "Rellena todos los campos"]},
  description: { type: String, required: [true, "Rellena todos los campos"]},
  year: { type: Number, required: [true, "Rellena todos los campos"]},
  image: { type: String },
  artist: { type: mongoose.Schema.ObjectId, ref: "Artist", required: [true, "Ingrese un artista Valido"]}
});

AlbumSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Album", AlbumSchema);
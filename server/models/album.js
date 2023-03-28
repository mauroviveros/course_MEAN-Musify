'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = Schema({
  name: { type: String, required: [true, "Rellena todos los campos"]},
  description: { type: String, required: [true, "Rellena todos los campos"]},
  year: { type: Number, required: [true, "Rellena todos los campos"]},
  image: { type: String },
  artist: { type: Schema.ObjectId, ref: "Artist", required: [true, "Ingrese un artista Valido"]}
});

module.exports = mongoose.model("Album", AlbumSchema);
'use strict';

const mongoose = require("mongoose");

const Album   = require("./album");

const SongSchema = mongoose.Schema({
  name: { type: String, required: [true, "Rellena todos los campos"]},
  number: { type: Number, required: [true, "Rellena todos los campos"]},
  duration: { type: String, required: [true, "Rellena todos los campos"]},
  file: { type: String },
  album: { type: mongoose.Schema.ObjectId, ref: "Album", required: [true, "Ingrese un album Valido"] }
});

SongSchema.pre('save', async function(next) {
  try {
    const album = await Album.findById(this.album);
    if (!album) throw new Error('El Album no existe');
    next();
  } catch (error) { next(error); }
});

SongSchema.pre('findByIdAndUpdate', async function(next) {
  try {
    const album = await Album.findById(this.getUpdate().$set.album);
    if (!album) throw new Error('El Album no existe');
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Song", SongSchema);
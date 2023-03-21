'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = Schema({
  name: { type: String, required: [true, "Rellena todos los campos"]},
  description: { type: String, required: [true, "Rellena todos los campos"] },
  image: String
});

module.exports = mongoose.model("Artist", ArtistSchema);
'use strict';

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ArtistSchema = mongoose.Schema({
  name: { type: String, required: [true, "Rellena todos los campos"]},
  description: { type: String, required: [true, "Rellena todos los campos"] },
  image: { type: String }
});

ArtistSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Artist", ArtistSchema);
'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = Schema({
    name: String,
    number: Number,
    duration: String,
    file: String,
    album: { type: Schema.ObjectId, ref: "Album" }
});

module.exports = mongoose.model("Song", SongSchema);
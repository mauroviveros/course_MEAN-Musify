'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: [ "USER", "ADMIN" ], default: "USER" },
  image: { type: String }
});

module.exports = mongoose.model("User", UserSchema);

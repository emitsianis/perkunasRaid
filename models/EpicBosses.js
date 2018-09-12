const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const epicBossSchema = new Schema({
  tod: {
    type: Date,
    required: true
  },
  tor: {
    type: Date,
    required: true
  },
  tor2: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  fullName: {
    type: String
  }
});

module.exports = EpicBosses = mongoose.model("epicbosses", epicBossSchema);

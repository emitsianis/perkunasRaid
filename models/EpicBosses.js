const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const epicBossSchema = new Schema({
  tod: {
    type: String,
    required: true
  },
  tor: {
    type: String,
    required: true
  },
  tor2: {
    type: String,
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

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aqcharSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  charClass: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  visits: {
    type: String,
    required: true,
    default: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
  }
});

module.exports = AqChars = mongoose.model("aqchars", aqcharSchema);

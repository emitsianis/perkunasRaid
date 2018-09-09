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
    required: true,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  visits: {
    type: Array,
    required: true,
    default: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]
  }
});

module.exports = AqChars = mongoose.model("aqchars", aqcharSchema);

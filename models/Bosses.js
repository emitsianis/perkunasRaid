const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bossSchema = new Schema({
  tod: {
    type: Date,
    required: true
  },
  tor: {
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

module.exports = Bosses = mongoose.model("bosses", bossSchema);

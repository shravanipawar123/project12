const mongoose = require("mongoose");

const hodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const HodModel = mongoose.model("hod", hodSchema);

module.exports = { HodModel };

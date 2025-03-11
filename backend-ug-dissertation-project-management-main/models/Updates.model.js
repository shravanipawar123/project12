const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const UpdateModel = mongoose.model("update", updateSchema);

module.exports = { UpdateModel };

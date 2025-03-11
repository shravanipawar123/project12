const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  projects: [
    {
      id: mongoose.Types.ObjectId,
      ref: user,
    },
  ],
});

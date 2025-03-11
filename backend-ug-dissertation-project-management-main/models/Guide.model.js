const mongoose = require("mongoose");
const StudentModel = require("./Student.model");

const guideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  tasks: [
    {
      title: {
        type: String,
        required: true,
      },
      description: String,
      deadline: Date,
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    },
  ],
  answeredQueries: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      query: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  marks: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      mark: {
        type: Number,
        required: true,
      },
    },
  ],
});

const GuideModel = mongoose.model("Guide", guideSchema);

module.exports = GuideModel;

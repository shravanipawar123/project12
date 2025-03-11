const mongoose = require("mongoose");
const GuideModel = require("./Guide.model");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  groupNumber: {
    type: Number,
    required: true,
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
  },
  teamLead: {
    type: String,
  },
  teamMembers: [
    {
      name: { type: String, required: true },
      rollNumber: { type: Number, required: true },
    },
  ],
  reviews: [
    {
      type: String,
      required: true,
    },
  ],
  projectStatus: {
    type: String,
    enum: ["In Progress", "Completed", "On Hold"],
    default: "In Progress",
  },
  projectName: {
    type: String,
  },
  projectTechstack: {
    type: String,
  },
  projectDescription: {
    type: String,
  },
  projectUrl: {
    type: String,
  },
  projectCategory: {
    type: String,
    enum: ["Web Development", "Mobile Development", "Data Science", "Others"],
  },
  softwaresUsed: {
    type: String,
  },
  tasks: [
    {
      title: {
        type: String,
        required: true,
      },
      description: String,
      deadline: Date,
    },
  ],
  marks: [
    {
      guide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guide",
      },
      mark: {
        type: Number,
        required: true,
      },
    },
  ],
  queries: [
    {
      query: {
        type: String,
        required: false, // Make the query field optional
      },
      answer: {
        type: String,
      },
      guide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guide",
      },
    },
  ],
});

const StudentModel = mongoose.model("student", studentSchema);

module.exports = StudentModel;

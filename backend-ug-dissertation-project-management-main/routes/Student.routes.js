const express = require("express");
const StudentModel = require("../models/Student.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GuideModel = require("../models/Guide.model");

const studentRouter = express.Router();

// route for registration

studentRouter.post("/register", async (req, res) => {
  const { name, email, password, contactNumber, groupNumber } = req.body;

  // H A S H I N G
  try {
    bcrypt.hash(password, 8, async (err, hashed_password) => {
      if (err) {
        console.log(err);
      } else {
        const student = new StudentModel({
          name,
          email,
          password: hashed_password,
          contactNumber,
          groupNumber,
        });
        await student.save();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(201).json({ message: "Group Registered", student });
      }
    });
  } catch (err) {
    res.status(500).send(err, "err in registering the student");
    console.log(err);
  }
});

//route for login
studentRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await StudentModel.find({ email });

    if (student.length > 0) {
      const hashedPassword = student[0].password;
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { studentID: student[0]._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.status(201).json({
            msg: "Login Successful",
            token: token,
            userId: student[0]._id,
          });
        } else {
          res.status(500).json("Wrong Credentials");
        }
      });
    } else {
      res.status(500).json("Login Failed");
    }
  } catch (err) {
    res.status(500).json("Something Went Wrong");
    console.log(err);
  }
});

//get all students
studentRouter.get("/allstudents", async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get student group Profile
studentRouter.get("/profile/:id", async (req, res) => {
  const studentID = req.params.id;
  try {
    const student = await StudentModel.findById(studentID);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(201).send(student);
  } catch (err) {
    res.status(500).send("Error fetching student profile");
    console.log(err);
  }
});

//update guide,team members and team lead info
studentRouter.patch("/profile/:id", async (req, res) => {
  const studentId = req.params.id;
  const { guideId, teamMembers, teamLead } = req.body;

  try {
    const student = await StudentModel.findByIdAndUpdate(studentId, {
      guide: guideId, // Assuming guideId is a valid ObjectId
      teamMembers,
      teamLead,
    }).populate("guide"); // Populate the guide field

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

studentRouter.get("/profile/withguide/:id", async (req, res) => {
  try {
    const { studentId } = req.params.id;

    const student = await StudentModel.findById(studentId).populate("Guide");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to post queries for students
studentRouter.post("/students/:studentId/add-query", async (req, res) => {
  const { studentId } = req.params;
  const { query, guideId } = req.body; // Assuming you're passing the query and guideId in the request body

  try {
    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Add the query to the student's profile
    student.queries.push({ query, guide: guideId });
    await student.save();

    res.status(201).json({ message: "Query added successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

studentRouter.get("/queries", async (req, res) => {
  try {
    const students = await StudentModel.find().select("queries");
    const allQueries = [];

    for (const student of students) {
      for (const query of student.queries) {
        const guide = await GuideModel.findById(query.guide).select("name");
        allQueries.push({
          query: query.query,
          guide: guide ? guide.name : "Unknown",
          answer: query.answer,
        });
      }
    }

    res.status(200).json(allQueries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update projectStatus
studentRouter.patch("/update-project-status/:id", async (req, res) => {
  const studentId = req.params.id;
  const { projectStatus } = req.body;

  try {
    const student = await StudentModel.findByIdAndUpdate(
      studentId,
      { projectStatus },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Project status updated successfully", student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating project status" });
  }
});

// POST route to add project information
studentRouter.post("/add-project-info", async (req, res) => {
  try {
    const {
      studentId, // Assuming you have a student ID to associate the project information with a student
      projectName,
      projectTechstack,
      projectDescription,
      projectUrl,
      projectCategory,
      softwaresUsed,
    } = req.body;

    // Find the student by ID and update their project information fields
    const student = await StudentModel.findByIdAndUpdate(
      studentId,
      {
        $set: {
          projectName,
          projectTechstack,
          projectDescription,
          projectUrl,
          projectCategory,
          softwaresUsed,
        },
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    return res
      .status(200)
      .json({ message: "Project information added successfully", student });
  } catch (error) {
    console.error("Error adding project information:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  studentRouter,
};

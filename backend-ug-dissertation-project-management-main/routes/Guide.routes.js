const express = require("express");
const GuideModel = require("../models/Guide.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StudentModel = require("../models/Student.model");
const extractGuideID = require("./exstractGuideId");

const guideRouter = express.Router();
//guideRouter.use(extractGuideID);

// REGISTER GUIDE

guideRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, 8, async (err, hashed_password) => {
      if (err) {
        console.log(err);
      } else {
        const guide = new GuideModel({
          name,
          email,
          password: hashed_password,
        });
        await guide.save();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(201).json({ message: "Guide Registered", guide });
      }
    });
  } catch (err) {
    res.status(500).send(err, "err in registering the guide");
    console.log(err);
  }
});

//LOGIN
guideRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const guide = await GuideModel.find({ email });

    if (guide.length > 0) {
      const hashedPassword = guide[0].password;
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { guideID: guide[0]._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.status(201).json({
            msg: "Login Successful",
            token: token,
            guideId: guide[0]._id,
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

//get all guides
guideRouter.get("/all", async (req, res) => {
  try {
    const guides = await GuideModel.find();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get guide  Profile
guideRouter.get("/profile/:id", async (req, res) => {
  const guideID = req.params.id;
  try {
    const guide = await GuideModel.findById(guideID);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(201).send(guide);
  } catch (err) {
    res.status(500).send("Error fetching guide profile");
    console.log(err);
  }
});

//get students associated with routes
guideRouter.get("/:id/students", async (req, res) => {
  const guideId = req.params.id;

  try {
    const students = await StudentModel.find({ guide: guideId });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//assign students

// Route to add a single student to a guide's profile
guideRouter.patch("/add-student/:guideId/:studentId", async (req, res) => {
  const { guideId, studentId } = req.params;

  try {
    // Find the guide by ID
    const guide = await GuideModel.findById(guideId);

    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    // Find the student by ID
    const student = await StudentModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update the guide's students array with the student ID
    guide.students.push(studentId);

    const updatedGuide = await guide.save();

    res.status(200).json(updatedGuide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add student to guide" });
  }
});

// Route to add query from student to guide
guideRouter.post("/add-query/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const { query } = req.body;

  try {
    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Add the query to the student's profile
    student.queries.push({
      query,
      guide: req.guideID, // Assuming you're extracting the guide's ID from the token
    });
    await student.save();

    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to answer query from student
guideRouter.patch("/answer-query/:studentId/:queryId", async (req, res) => {
  const { studentId, queryId } = req.params;
  const { answer } = req.body;

  try {
    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Find the query in the student's profile
    const queryIndex = student.queries.findIndex(
      (q) => q._id.toString() === queryId
    );
    if (queryIndex === -1) {
      return res.status(404).json({ error: "Query not found" });
    }

    // Update the query with the answer
    student.queries[queryIndex].answer = answer;
    await student.save();

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get queries asked by students associated with this guide
guideRouter.get("/queries", async (req, res) => {
  try {
    const guideID = req.guideID; // Assuming you're extracting the guide's ID from the token
    const students = await StudentModel.find({ guide: guideID });

    // Extract queries from all students associated with this guide
    const queries = students.reduce((acc, student) => {
      acc.push(...student.queries);
      return acc;
    }, []);

    res.status(200).json(queries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to create a task
guideRouter.post("/create-task/:guideId", async (req, res) => {
  const guideId = req.params.guideId;
  const { title, description, deadline, assignedTo } = req.body;

  try {
    const guide = await GuideModel.findById(guideId);
    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }

    // Create the task object
    const task = {
      title,
      description,
      deadline,
      assignedTo,
    };

    // Add the task to the guide's tasks array
    guide.tasks.push(task);
    await guide.save();

    res.status(201).json(guide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get tasks created by a guide
guideRouter.get("/tasks/:guideId", async (req, res) => {
  const guideId = req.params.guideId;

  try {
    // Find the guide by ID
    const guide = await GuideModel.findById(guideId);
    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }

    // Retrieve tasks created by the guide
    const tasks = guide.tasks;

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = {
  guideRouter,
};

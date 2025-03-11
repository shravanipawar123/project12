const express = require("express");
const { connection } = require("./configs/db");
const { studentRouter } = require("./routes/Student.routes");
const { guideRouter } = require("./routes/Guide.routes");
const { updatesRouter } = require("./routes/Updates.routes");

const { authenticate } = require("./middlewares/authenticate.middleware");
const cors = require("cors");

require("dotenv").config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to UG Dissertaion Management App");
});

app.use("/users", studentRouter);
app.use("/guide", guideRouter);
//middleware
// app.use(authenticate);

app.use("/updates", updatesRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the DB");
  } catch (err) {
    console.log(err);
  }
  console.log(`listening at port : ${process.env.port}`);
});

const express = require("express");
const { UpdateModel } = require("../models/Updates.model");

const updatesRouter = express.Router();

//POST AN UPDATE

updatesRouter.post("/createupdate", async (req, res) => {
  const { name, description } = req.body;
  try {
    const update = new UpdateModel({ name, description });
    await update.save();
    res.status(200).send(update);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating update");
  }
});

// GET ALL UPDATES
updatesRouter.get("/allupdates", async (req, res) => {
  try {
    const updates = await UpdateModel.find();
    res.status(200).send(updates);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting updates");
  }
});

module.exports = {
  updatesRouter,
};

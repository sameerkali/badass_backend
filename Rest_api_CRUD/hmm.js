const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//! mongoose
mongoose
  .connect("mongodb://localhost:27017/kaddu")
  .then(() => console.log("Connected mongoose with hmmm"))
  .catch((err) => console.log(err));

const kadduSchema = new mongoose.Schema({
  name: String,
  kaddu: Boolean
});
const Kaddu = mongoose.model("Kaddu", kadduSchema);
// mongoose end

//!create
app.post("/kaddu/create", async (req, res) => {
  const kaddu = await Kaddu.create(req.body);
  res.status(200).json({ kaddu: "ban gayaa kaddu" });
});
//!read
app.get("/kaddus", async (req, res) => {
  const kaddu = await Kaddu.find();
  res
    .status(200)
    .json({ kaddu: "ban gayaa kaddu aur read bhe ho gayaa", kaddu });
});
//!update
app.put("/kaddu/:id", async (req, res) => {
  await Kaddu.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({ kaddu: "ban gayaa kaddu aur update bhe ho gayaa" });
});
//!delete
app.delete("/kaddu/:id", async (req, res) => {
  await Kaddu.findByIdAndDelete();
  res.status(200).json({ kaddu: "ban gayaa kaddu aur delete bhe ho gayaa" });
});

app.listen(5656, () => console.log("listning on port 5656..."));

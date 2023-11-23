const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const PORT = 6969;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//! mongo start

mongoose
  .connect("mongodb://localhost:27017/CRUD_nov_23")
  .then(() => {
    console.log("conect with mongoose");
  })
  .catch((err) => console.log(err));

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model("User", schema);
// mongo end

//!create
app.post("/api/v1/user/new", async (req, res) => {
  const user = await User.create(req.body);

  res.status(200).json({ sucess: true, kaam: "ho gayaa" });
});

//!read
app.get("/api/v1/users", async (req, res) => {
  const user = await User.find();

  res.status(200).json({ sucess: true, kaam: "ho gayaa", user });
});

//!update
app.put("/api/v1/user/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  user = await User.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({ sucess: true, kaam: "ho gayaa updated" });
});

//!delete
app.delete("/api/v1/user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ sucess: true, kaam: "ho gayaa delete" });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

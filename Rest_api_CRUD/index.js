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

  res.status(201).json({ kaam: "ho gayaa sab badhiyaa bhai" });
});


//!read
app.get("/api/v1/users", async (req, res) => {
  const users = await User.find();
  res.status(201).json({ kaam: "ho gayaa sab badhiyaa bhai", users });
});


//!update
app.put("/api/v1/user/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(500).json({ kaam: "nhi hua bhai", product: "not found" });
  }
  user = await User.findByIdAndUpdate(req.params.id, req.body); 
  res.status(200).json({ kaam: "ho gayaa sab badhiyaa bhai", product: "updated" });
});


//!delete
app.delete("/api/v1/user/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(500).json({ kaam: "nhi hua bhai", product: "not found" });
  }
  await user.deleteOne();
  res.status(200).json({ kaam: "ho gayaa sab badhiyaa bhai", product: "deleted" });

});



app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const PORT = 6969;
console.log("hii sameer");
const app = express();
//! mongo start

mongoose.connect("mongodb://localhost:27017/CRUD_oct_23");
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
//! mongo end
app.get("/", (req, res) => {
  res.send({
    sab_kaisa_hai: "sab bhadiyaa hai"
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});


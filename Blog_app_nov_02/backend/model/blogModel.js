const mongoose = require("mongoose");

//Blog schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"]
  },
  description: {
    type: String,
    required: [true, "description is required"]
  },
  image: {
    type: String,
    required: [false, "image is required"]
  },
  user:{
    type: mongoose.Types.ObjectId,
    ref: "user",
    require: [true, "user id is required"],

  }
}, {timestamps: true});

const blogModel = new mongoose.model("Blog", blogSchema);
module.exports = blogModel;
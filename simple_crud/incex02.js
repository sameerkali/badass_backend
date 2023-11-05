const express = require("express");
const mongoose = require("mongoose");
const {Schema} = mongoose

const app = express();
const api_url = "mongodb://localhost:27017/demoDB";
mongoose.connect(api_url);

const mongoschema = new Schema({
  name: String,
  number: Number,
});
const Detals = mongoose.model("Detals", mongoschema);

// start crud operations
// create
const deatil_create = async (name, numner) => {
  const c1 = new Detals({ name, numner });
  await c1.save();
};
// read
const deatil_read = async () => {
  await Detals.find();
};
//update
const deatil_update = async (name, number) => {
  await Detals.updateOne({ name }, { number });
};
//delete
const deatil_delete = async (name) => {
  await Detals.deleteOne({ name });
};

deatil_create("sameer", 6969)






const PORT = process.env.PORT || 6969;
app.listen(PORT, () => console.log(`server is listening on ${PORT}`));

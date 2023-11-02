const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connecting to mongoDB sucessfully ${mongoose.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`Mongo Error: ${error}`.bgRed.white);
  }
};

module.exports = connectDB;

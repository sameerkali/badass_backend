const userModel = require("../model/userModel");

// register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        sucess: false,
        message: "Please enter all required information"
      });
    }
    // check for existing users
    const existingUsers = await userModel.findOne({ email });
    if (existingUsers) {
      return res.status(401).send({
        sucess: false,
        message: "User already exists"
      });
    }
    //save new user
    const user = new userModel({ username, email, password });
    await user.save();
    return res.status(201).send({
      sucess: true,
      message: "New user has been created",
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register callback",
      sucess: false,
      error
    });
  }
};

// get all users
exports.getAllUsers = () => {};

// login user
exports.loginController = () => {};

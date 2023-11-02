const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

// register user                                        --------------------------------
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        sucess: false,
        message: "Please enter all required information haan!!!"
      });
    }
    // check for existing users
    const existingUsers = await userModel.findOne({ email });  // main logic
    if (existingUsers) {
      return res.status(401).send({
        sucess: false,
        message: "User already exists"
      });
    }

    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 4);

    //save new user
    const user = new userModel({ username, email, password: hashedPassword });
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

// get all users                                            --------------------------------
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}); // main logic
    return res.status(200).send({
      userCount: users.length,
      sucess: true,
      messages: "all users data",
      users
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sucess: false,
      message: "Error in getAllUsers callback",
      error
    });
  }
};

// login user                                              --------------------------------
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate user
    if (!email || !password) {
      return res.status(401).send({
        sucess: false,
        message: "Please Provide email and password",
        error
      });
    }
    //check email
    const user = await userModel.findOne({ email }); // main logic
    if (!user) {
        return res.status(200).send({
            sucess: true,
            message: "Email is not registered"
        })
    }
    //check password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        return res.status(401).send({
            sucess: false,
            message: " invalid password"
        })
    }
    return res.status(200).send({
        sucess: true,
        message: "user login successful",
        user
    })


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sucess: false,
      message: "Error in loginController callback",
      error
    });
  }
};

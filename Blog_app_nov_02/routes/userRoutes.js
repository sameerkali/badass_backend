const express = require("express");

const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controller/userController");

// router object
const router = express.Router();

// add middleware to log requests
router.use(async (req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// get all users
router.get("/all-users", getAllUsers);

// create a new user
router.post("/register", registerController);

// login
router.post("/login", loginController);

module.exports = router;

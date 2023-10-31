const express = require("express");
// const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const Port = 8000;

//! mongoDB start
//connection
mongoose
  .connect("mongodb://localhost:27017/CRUD_oct_23")
  .then(console.log("MongoDB connection established"))
  .catch((err) => console.log("Mongo error ", err));
//Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
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
    },
    job_title: {
      type: "string",
      required: true
    },
    gender: {
      type: String
    }
  },
  { timestamps: true }
);
//model
const User = mongoose.model("User", userSchema);
//! mongoDB  ends

//Middleware || Plugin
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
  <ol>
  ${allDbUsers.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ol>
  `;
  res.send(html);
});

//api

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

//Combine multiple routes in one
app
  .route("/api/users/:id")

  .get(async (req, res) => {
    // const id = +req.params.id;
    // const user = users.find((user) => user.id === id);
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  })

  //put
  .put(async (req, res) => {
    // const id = Number(req.params.id);
    // const index = users.findIndex((user) => user.id === id);
    // //logic
    // users[index] = { ...users[index], ...req.body };
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    //   res.json({ status: "success edit" });
    // });
    await User.findByIdAndUpdate(req.params.id, { last_name: "changeed" });
    return res.json({ status: "success edit" });
  })

  //delete
  .delete( async(req, res) => {
    // const id = Number(req.params.id);
    // const index = users.findIndex((user) => user.id === id);
    // users.splice(index, 1);
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    //   res.json({ status: "success delete" });
    // });
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success delete" });
  });

// Post request
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(404).json({ msg: "all fields are required" });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title
  });
  console.log("Result", result);
  return res.status(201).json({ msg: "sucessfully created" });

  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.json({ status: "sucess", id: users.length });
  // });
});

app.listen(Port, () => console.log(`server listening on port ${Port}`));

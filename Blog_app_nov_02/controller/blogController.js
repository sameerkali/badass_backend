const blogModel = require("../model/blogModel");

// Get all blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).send({
        sucess: false,
        messege: "No blog found"
      });
    }
    return res.status(200).send({
        sucess: true,
        BlogCount: blogs.length,
        messege: "All blog list",
        blogs
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sucess: false,
      messege: "Error while getting the blog's"
    });
  }
};

// create a new blog
exports.createBlogController = async (req, res) => {
  try {
    const {title, description, image} = req.body
    //validation 
    if(!title || !description || !image){
        return res.status(400).send({
            sucess: false,
            messege: "please provide all fields"
          });
    }
    //save the blog
    const newBlog = new blogModel({title, description, image})
    await newBlog.save()
    return res.status(201).send({
        sucess: true,
        messege: "Blog created successfully",
        newBlog
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sucess: false,
      messege: "Error while creating the blog's"
    });
  }
};

// Update a blog
exports.updateBlogController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sucess: false,
      messege: "Error while getting the blog's"
    });
  }
};

// get a blog by id
exports.getBlogByIdController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sucess: false,
      messege: "Error while getting the blog's"
    });
  }
};

// delete a blog
exports.deleteBlogController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sucess: false,
      messege: "Error while getting the blog's"
    });
  }
};

const blogModel = require("../model/blogModel");

// Get all blogs                                         ...............................................
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}); //main logic
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

// create a new blog                                         ...............................................
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    //validation
    if (!title || !description || !image) {
      return res.status(400).send({
        sucess: false,
        messege: "please provide all fields"
      });
    }
    //save the blog
    const newBlog = new blogModel({ title, description, image }); //main logic
    await newBlog.save();
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

// Update a blog                                         ...............................................
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      /*main logic*/
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      sucess: true,
      messege: "Update the Blog successfully",
      blog
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sucess: false,
      messege: "Error while updating the blog"
    });
  }
};

// get single blog by id                                         ...............................................
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);  //main logic
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this id"
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      "meri taraf ka message": "mill gayaa bhai",
      blog
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      sucess: false,
      messege: "Error while getting single blog"
    });
  }
};

// delete a blog                                         ...............................................
exports.deleteBlogController = async (req, res) => {
  try {
    await blogModel.findByIdAndDelete(req.params.id) //findOneAndDelete //main logic
    return res.status(200).send({
        sucess: true,
        messege: "Delete blog sucessfully"
      });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      sucess: false,
      messege: "Error while deleting the blog"
    });
  }
};

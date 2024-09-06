const { Post } = require("../models");
const multer = require("multer");
// const upload = multer({dest: '/uploads/'})
const Model = Post;

async function getAllItems() {
  try {
    return await Model.find();
  } catch (err) {
    throw new Error(err);
  }
}

async function getItemById(id) {
  try {
    return await Model.findById(id);
  } catch (err) {
    throw new Error(err);
  }
}

async function createItem(data) {
  try {
    return await Model.create(data);
  } catch (err) {
    throw new Error(err);
  }
}

const createPostWithImage = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      username: req.body.username,
      location: req.body.location,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function updateItemById(id, data) {
  try {
    return await Model.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteItemById(id) {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getAllPosts: getAllItems,
  getPostById: getItemById,
  createPost: createItem,
  updatePostById: updateItemById,
  deletePostById: deleteItemById,
  createPostWithImage,
};

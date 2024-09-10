const { Post } = require("../models");
const { User } = require("../models");
const multer = require("multer");
const { verifyUser } = require("../controllers/user.controller")
const Model = Post;

async function getAllPosts() {
  try {
    return await Model.find();
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw new Error(err);
  }
}

async function getPostById(id) {
  try {
    return await Model.findById(id);
  } catch (err) {
    console.error("Error fetching post by ID:", err);
    throw new Error(err);
  }
}

async function createPost(req) {

  const { title, description, condition, price, category, user } = req.body

  try {
    const verifiedUser = await verifyUser(req)
    
    if( !verifiedUser ){
      throw new Error("Could not verify");
    }

    const post = await Model.create({ title, description, condition, price, category, user });
    await User.findByIdAndUpdate(
      user,
      { $push: { posts: post._id }},
      { new: true }
    );

    return post;
  } catch (err) {
    throw new Error(err);
  }
}

async function updatePostById(id, data) {

  try {
    return await Model.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    console.error("Error updating post:", err);
    throw new Error(err);
  }
}

async function deletePostById(id) {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (err) {
    console.error("Error deleting post:", err);
    throw new Error(err);
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
};


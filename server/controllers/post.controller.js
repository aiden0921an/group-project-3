const { Post } = require("../models");
const { User } = require("../models");
const multer = require("multer");
const { verifyUser } = require("../controllers/user.controller");
const Model = Post;

async function getAllPosts() {
  try {
    const posts = await Post.find().populate("user").exec();

    return posts;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw new Error(
      "Unable to fetch posts at the moment. Please try again later."
    );
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
  const user = await verifyUser(req);

  try {
    const post = await Model.create({ ...req.body, user: user._id });

    await User.findByIdAndUpdate(
      user._id,
      { $push: { posts: post._id } },
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

const { Post } = require("../models");
const { User } = require("../models");
const multer = require("multer");
const { verifyUser } = require("../controllers/user.controller");
const Model = Post;

async function getAllPosts() {
  try {
    return await Post.find().populate("category").populate("user");
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
  const { title, description, condition, price, category, imageUrl, user } =
    req.body;

  console.log(user);

  try {
    const verifiedUser = await verifyUser(req);

    if (!verifiedUser) {
      throw new Error("Could not verify");
    }

    const post = await Post.create({
      title,
      description,
      condition,
      price,
      category,
      user,
      ...(imageUrl && { imageUrl }),
    });

    await User.findByIdAndUpdate(
      user,
      { $push: { posts: post._id } },
      { new: true }
    );

    return post;
  } catch (err) {
    console.error("Error creating post:", err);
    throw new Error(err.message);
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

async function getPostsByUserId(userId) {
  try {
    return await Post.find({ user: userId }); // Ensure this matches your schema field
  } catch (error) {
    throw new Error("Error fetching posts: " + error.message);
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
  getPostsByUserId,
};

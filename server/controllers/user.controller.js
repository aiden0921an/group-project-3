const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Model = User;

async function verifyUser(req) {
  //console.log(req.cookies);

  let cookie;
  try {
    cookie = await req.cookies["auth-cookie"];
  } catch (err) {
    console.log(err);
  }

  console.log("cookie", cookie);
  if (!cookie) return false;

  try {
    const isVerified = jwt.verify(cookie, process.env.JWT_SECRET);

    if (!isVerified) return false;

    const user = await Model.findOne({ _id: isVerified.id });
    return user || false;
  } catch (err) {
    console.error("Error verifying user:", err);
    return false;
  }
}

async function authenticate(data) {
  try {
    const user = await Model.findOne({ email: data.email });
    if (!user) throw new Error("No user found");

    const userIsOk = await bcrypt.compare(data.password, user.password);
    if (!userIsOk) throw new Error("Could not login");

    return user;
  } catch (err) {
    console.error("Error authenticating user:", err);
    throw new Error(err.message);
  }
}

async function getAllUsers() {
  try {
    return await Model.find();
  } catch (err) {
    console.error("Error fetching users:", err);
    throw new Error(err);
  }
}

async function getUserById(id) {
  try {
    return await Model.findById(id).populate("posts");
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    throw new Error(err);
  }
}

async function createUser(data) {
  try {
    return await Model.create(data);
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error(err);
  }
}

async function updateUserById(id, data) {
  try {
    return await Model.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    console.error("Error updating user:", err);
    throw new Error(err);
  }
}

async function deleteUserById(id) {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (err) {
    console.error("Error deleting user:", err);
    throw new Error(err);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  authenticate,
  verifyUser,
};

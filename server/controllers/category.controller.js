const { Category } = require("../models");
const Model = Category;

async function getAllItems() {
  try {
    return await Model.find();
  } catch (err) {
    console.error("Error fetching items:", err);
    throw new Error(err);
  }
}

async function getItemById(id) {
  try {
    return await Model.findById(id);
  } catch (err) {
    console.error("Error fetching item by ID:", err);
    throw new Error(err);
  }
}

async function createItem(req) {
  try {
    const newItem = await Model.create(req.body);
    return newItem;
  } catch (err) {
    console.error("Error creating item:", err);
    throw new Error(err.message);
  }
}

async function updateItemById(id, data) {
  try {
    return await Model.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    console.error("Error updating item:", err);
    throw new Error(err);
  }
}

async function deleteItemById(id) {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (err) {
    console.error("Error deleting item:", err);
    throw new Error(err);
  }
}

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItemById,
  deleteItemById,
};

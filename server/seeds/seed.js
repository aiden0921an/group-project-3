const db = require("../config/connection");
const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");
const bcrypt = require("bcrypt");

const categories = [
  { name: "Real Estate" },
  { name: "Vehicles" },
  { name: "Services" },
];

const users = [
  {
    username: "john_doe",
    email: "john.doe@example.com",
    password: "password123",
    posts: [],
  },
  {
    username: "jane_smith",
    email: "jane.smith@example.com",
    password: "password123",
    posts: [],
  },
  {
    username: "alice_jones",
    email: "alice.jones@example.com",
    password: "password123",
    posts: [],
  },
];

const posts = [
  {
    title: "Lovely Apartment for Rent",
    description: "A beautiful apartment with a great view.",
    price: 1500,
    location: {
      street: "123 Elm St",
      city: "Springfield",
      state: "IL",
      zip: 12345,
    },
    imageUrl: "/uploads/nathan-walker-winter-house-unsplash.jpg",
  },
  {
    title: "Used Car for Sale",
    description: "A reliable used car at a good price.",
    price: 5000,
    location: {
      street: "456 Maple Ave",
      city: "Springfield",
      state: "IL",
      zip: 12345,
    },
    imageUrl: "/uploads/loic-mermilliod-vehicles-unsplash.jpg",
  },
  {
    title: "Guitar Lessons Available",
    description: "Learn to play the guitar with personalized lessons.",
    price: 50,
    location: {
      street: "789 Oak Dr",
      city: "Springfield",
      state: "IL",
      zip: 12345,
    },
    imageUrl: "/uploads/nathana-reboucas-services-unsplash.jpg",
  },
];

db.once("open", async () => {
  try {
    // Drop collections if they exist
    await Promise.all([
      db.db
        .listCollections({ name: "users" })
        .toArray()
        .then((collections) => {
          if (collections.length) return db.db.dropCollection("users");
        }),
      db.db
        .listCollections({ name: "posts" })
        .toArray()
        .then((collections) => {
          if (collections.length) return db.db.dropCollection("posts");
        }),
      db.db
        .listCollections({ name: "categories" })
        .toArray()
        .then((collections) => {
          if (collections.length) return db.db.dropCollection("categories");
        }),
    ]);

    // Insert categories and get their IDs
    const insertedCategories = await Category.insertMany(categories);
    const categoryIds = insertedCategories.map((category) => category._id);

    // Hash passwords
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    // Insert users and get their IDs
    const insertedUsers = await User.insertMany(hashedUsers);
    const userIds = insertedUsers.map((user) => user._id);

    // Assign categories to posts (cyclically for this example)
    const postsWithCategories = posts.map((post, index) => ({
      ...post,
      category: categoryIds[index % categoryIds.length], // Assign categories cyclically or as needed
      user: userIds[index % userIds.length], // Assign posts to users cyclically or as needed
    }));

    // Insert posts
    await Post.insertMany(postsWithCategories);

    console.log("Seeding complete");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Graceful exit
    db.close();
  }
});

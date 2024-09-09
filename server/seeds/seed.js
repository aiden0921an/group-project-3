const db = require("../config/connection");
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

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
    category: "Real Estate",
    price: 1500,
    location: {
      street: "123 Elm St",
      city: "Springfield",
      zip: 12345,
      state: "IL",
    },
  },
  {
    title: "Used Car for Sale",
    description: "A reliable used car at a good price.",
    category: "Vehicles",
    price: 5000,
    location: {
      street: "456 Maple Ave",
      city: "Springfield",
      zip: 12345,
      state: "IL",
    },
  },
  {
    title: "Guitar Lessons Available",
    description: "Learn to play the guitar with personalized lessons.",
    category: "Services",
    price: 50,
    location: {
      street: "789 Oak Dr",
      city: "Springfield",
      zip: 12345,
      state: "IL",
    },
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
    ]);

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

    // Assign users to posts
    const postsWithUsers = posts.map((post, index) => ({
      ...post,
      user: userIds[index % userIds.length], // Assign posts to users cyclically or as needed
    }));

    // Insert posts and get their IDs
    await Post.insertMany(postsWithUsers);

    console.log("Seeding complete");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Graceful exit
    db.close();
  }
});

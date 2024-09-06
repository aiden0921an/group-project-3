const db = require("../config/connection")

const User = require('../models/User');
const Post = require('../models/Post');

const users = [
  {
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'password123',
    posts: []
  },
  {
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    password: 'password123',
    posts: []
  },
  {
    username: 'alice_jones',
    email: 'alice.jones@example.com',
    password: 'password123',
    posts: []
  }
];

const posts = [
  {
    title: 'Lovely Apartment for Rent',
    description: 'A beautiful apartment with a great view.',
    category: 'Real Estate',
    price: 1500,
    location: {
      street: '123 Elm St',
      city: 'Springfield',
      zip: 12345,
      state: 'IL'
    }
  },
  {
    title: 'Used Car for Sale',
    description: 'A reliable used car at a good price.',
    category: 'Vehicles',
    price: 5000,
    location: {
      street: '456 Maple Ave',
      city: 'Springfield',
      zip: 12345,
      state: 'IL'
    }
  },
  {
    title: 'Guitar Lessons Available',
    description: 'Learn to play the guitar with personalized lessons.',
    category: 'Services',
    price: 50,
    location: {
      street: '789 Oak Dr',
      city: 'Springfield',
      zip: 12345,
      state: 'IL'
    }
  }
];

db.once('open', async () => {

  try {

    let usersCheck = await db.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await db.db.dropCollection('users');
    }

    let postsCheck = await db.db.listCollections({ name: 'posts' }).toArray();
    if (postsCheck.length) {
      await db.db.dropCollection('posts');
    }

    const insertedPosts = await Post.insertMany(posts)
    const postIds = insertedPosts.map(post => post._id);
    const insertedUsers = await User.insertMany(users)
    const userIds = insertedUsers.map(user => user._id);

    const userPostPairs = userIds.map((userId, index) => ({
      userId: userId,
      postId: postIds[index]
    }));

    await Promise.all(
      userPostPairs.map(pair =>
        User.updateOne(
          { _id: pair.userId },
          { $set: { posts: [pair.postId] } }
        )
      )
    );

    console.log('Seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
});

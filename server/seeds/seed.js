// const db = require("../config/connection")

/*
  To seed data:

  1. Import your model
  2. Create an array of data with the variable name seedData
  3. Uncomment the code above and replace MODEL with your imported model

*/


// db.once('open', async () => {
//   await MODEL.insertMany(seedData)
//   console.log("seeding complete")
//   process.exit(0)
// });


const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path as necessary
const Post = require('../models/Post'); // Adjust the path as necessary

// Define sample data
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
    username: 'john_doe',
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
    username: 'john_doe',
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
    username: 'jane_smith',
    location: {
      street: '789 Oak Dr',
      city: 'Springfield',
      zip: 12345,
      state: 'IL'
    }
  },
  {
    title: 'Brand New Smartphone',
    description: 'Latest model smartphone with all features.',
    category: 'Electronics',
    price: 800,
    username: 'alice_jones',
    location: {
      street: '101 Pine Ln',
      city: 'Springfield',
      zip: 12345,
      state: 'IL'
    }
  }
];

// Connect to MongoDB and seed data
mongoose.connect('mongodb://127.0.0.1:27017/group-project-3', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB');

  // Create users
  for (const userData of users) {
    const user = new User(userData);
    await user.save();
  }

  // Create posts
  for (const postData of posts) {
    const post = new Post(postData);
    await post.save();
  }

  console.log('Data seeded successfully');
  mongoose.connection.close();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

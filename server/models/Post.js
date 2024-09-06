const { Schema, model } = require('mongoose');
const locationSchema = require('./Location')

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    min_length: 1,
    max_length: 100
  },
  description: {
    type: String,
    required: true,
    min_length: 1,
    max_length: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(value){
      return value.toDateString()
    },
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  location: [locationSchema]
});

const Post = model('Post', postSchema);
module.exports = Post;
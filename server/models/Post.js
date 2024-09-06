const { Schema, model } = require('mongoose');
const locationSchema = new Schema({
  street: {type: String, required: true},
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: {type: Number, required: true },
});

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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: [locationSchema]
});

const Post = model('Post', postSchema);
module.exports = Post;

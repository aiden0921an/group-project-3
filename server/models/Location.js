const { Schema, model } = require('mongoose');

const locationSchema = new Schema(
    {
      street: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 50,
      },
      city: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 50,
      },
      zip: {
        type: Number,
        required: true,
        min_length: 5,
        max_length: 5,
      },
      state: {
        type: String,
        required: true,
        min_length: 2,
        max_length: 2,
      },
    },
    {
      toJSON: {
        getters: true,
      }
    }
  );


module.exports = locationSchema;

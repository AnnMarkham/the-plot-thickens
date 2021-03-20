const { Schema, model } = require('mongoose');
const noteSchema = require('./Note');
const dateFormat = require('../utils/dateFormat');

const storySchema = new Schema(
  {
    storyText: {
      type: String,
      required: 'Start your story here!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    notes: [noteSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

storySchema.virtual('noteCount').get(function() {
  return this.notes.length;
});

const Story = model('Story', storySchema);

module.exports = Story;

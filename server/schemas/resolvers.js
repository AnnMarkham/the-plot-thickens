const { AuthenticationError } = require('apollo-server-express');
const { User, Story } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('stories')
          .populate('notes');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('stories')
        .populate('notes');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('notes')
        .populate('stories');
    },
    stories: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Story.find(params).sort({ createdAt: -1 });
    },
    story: async (parent, { _id }) => {
      return Story.findOne({ _id });
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addStory: async (parent, args, context) => {
      if (context.user) {
        const story = await Story.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { stories: story._id } },
          { new: true }
        );

        return story;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addNote: async (parent, { storyId, noteBody }, context) => {
      if (context.user) {
        const updatedStory = await Story.findOneAndUpdate(
          { _id: storyId },
          { $push: { noets: { noteBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );

        return updatedStory;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addCollaborator: async (parent, { collaboratorId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { collaborators: collaboratorId } },
          { new: true }
        ).populate('collaborators');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;

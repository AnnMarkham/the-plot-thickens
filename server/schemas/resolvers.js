const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Story }= require('../models');

const resolvers = {
    Query: {
        //works with Me: User in typeDefs Query so server can send JWT with every request
        //note also requires adding context to server.js and uses middleware in utils/auth
        //me method checks for existence for existence of context.user property and authentication error if not
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('stories')
                .populate('collaborators');
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
        },

        //get all stories
        stories: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Story.find(params).sort({ createdAt: -1 });
          },
          //get one story by id
          story: async(parent, {_id }) => {
              return Story.findOne({ _id });
          },

          //get all users
          users: async () => {
            return User.find()
              .select('-__v -password')
              .populate('collaborators')
              .populate('stories')
          },
          // get a user by username
          user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
              .populate('stories')
              .populate('collaborators')
        },
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

          //first check for context.user
          //decoded JWT is only added to context if verification passes
          //token includes username, email & _id which can then be used in Story.create() & User.findByIdAndUpdate
        
          addStory: async (parent, args, context) => {
            if (context.user) {
              const story = await Story.create({ ...args, username: context.user.username });
          
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { stories: story._id } },
                //if not new: true, Mondo would return original doc instead of updated one
                { new: true }
              );
          
              return story;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },

          addNote: async (parent, { storyId, noteBody }, context) => {
            if (context.user) {
              const updatedStory = await Story.findOneAndUpdate(
                { _id: storytId },
                { $push: { notes: { noteBody, username: context.user.username } } },
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
                { $addToSet: { collborators: colaboratorId } },
                { new: true }
              ).populate('collaborators');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
          

      }
    };

  
  module.exports = resolvers;
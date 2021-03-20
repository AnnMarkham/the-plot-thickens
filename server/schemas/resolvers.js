const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Story }= require('../models');

const resolvers = {
    Query: {
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
              .populate('thoughts')
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
          }
      }
    };

  
  module.exports = resolvers;
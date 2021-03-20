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
    }
};
  
  module.exports = resolvers;
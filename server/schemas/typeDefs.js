// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

type User {
  _id: ID
  username: String
  email: String
  collaboratorCount: Int
  stories: [Story]
  collaborators: [User]
}


  type Story {
    _id: ID
    storyText: String
    createdAt: String
    username: String
    noteCount: Int
    notes: [Note]
  }

  type Note {
    _id: ID
    noteBody: String
    createdAt: String
    username: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    stories(username: String): [Story]
    story(_id:ID!): Story
  }


`;

// export the typeDefs
module.exports = typeDefs;
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

  type Auth {
  token: ID!
  user: User
}
   type Query {
    me: User
    users: [User]
    user(username: String!): User
    stories(username: String): [Story]
    story(_id:ID!): Story
  }

  type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  addStory(storyText: String!): Story
  addNote(storyId: ID!, noteBody: String!): Story
  addCollaborator(collaboratorId: ID!): User
}
`;

// export the typeDefs
module.exports = typeDefs;
import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const ADD_STORY = gql`
  mutation addStory($storyText: String!) {
    addStory(storyText: $storyText) {
      _id
      storyText
      createdAt
      username
      noteCount
      notes {
        _id
      }
    }
  }
`;

export const DELETE_STORY= gql`
mutation deleteStory($storyId: ID){
  deleteStory(storyId: $storyId){  
      _id
      storyText
      createdAt
      username
      noteCount
      notes {
        _id
      }
    }
 }
 `;

export const ADD_NOTE = gql`
  mutation addNote($storyId: ID!, $noteBody: String!) {
    addNote(storyId: $storyId, noteBody: $noteBody) {
      _id
      noteCount
      notes {
        _id
        noteBody
        createdAt
        username
      }
    }
  }
`;



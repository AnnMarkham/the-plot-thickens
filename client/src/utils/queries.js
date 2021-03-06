import gql from 'graphql-tag';

export const QUERY_STORIES = gql`
  query stories($username: String) {
    stories(username: $username) {
      _id
     storyText
     createdAt
     username
     noteCount
      notes {
        _id
        createdAt
        username
        noteBody
      }
    }
  }`
  
  export const QUERY_STORY = gql`
  query story($id: ID!) {
    story(_id: $id) {
      _id
      storyText
      createdAt
      username
      noteCount
      notes {
        _id
        createdAt
        username
       noteBody
      }
    }
  }
`;
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      collaboratorCount
      collaborators {
        _id
        username
      }
      stories {
        _id
        storyText
        createdAt
        noteCount
      }
    }
  }
`;
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      collaboratorCount
      stories {
        _id
        storyText
        createdAt
        noteCount
        notes {
          _id
          createdAt
          noteBody
          username
        }
      }
      collaborators {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      collaboratorCount
      collaborators {
        _id
        username
      }
    }
  }
`;

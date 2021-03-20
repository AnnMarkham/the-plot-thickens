import gql from 'graphql-tag';

export const QUERY_STORIES = gql`
  query stories($username: String) {
    stories(username: $username) {
      _id
     storyText
      createdAt
      username
     noteCount
      notess {
        _id
        createdAt
        username
        noteBody
      }
    }
  }
`;
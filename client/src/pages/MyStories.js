import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import StoryList from '../components/StoryList';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const MyStories = props => {
  const { username: userParam } = useParams();

   const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  // redirect to personal mystories page if username is 
  if (
    Auth.loggedIn() &&
    Auth.getMyStories().data.username === userParam
  ) {
    return <Redirect to="/mystories" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
  
      <div className="row">
        <div className="col s12 m4 13 future-story-page">
          <div className="row">
          <p>Future Home of Characters</p>
          <p>Future Home of Settings</p>
          </div>
        </div>
        <div className="col s12 m8 19">
          <StoryList stories={user.stories} title={`${user.username}'s stories...`}></StoryList>
        </div>
      </div>
    
  );
};

export default MyStories;

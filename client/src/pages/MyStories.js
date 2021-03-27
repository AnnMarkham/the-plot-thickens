import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import StoryList from '../components/StoryList';
import CollaboratorList from '../components/CollaboratorList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_COLLABORATOR } from '../utils/mutations';
import Auth from '../utils/auth';

const MyStories = props => {
  const { username: userParam } = useParams();

  const [addCollaborator] = useMutation(ADD_COLLABORATOR);
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

  const handleClick = async () => {
    try {
      await addCollaborator({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Collaborator
          </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <StoryList stories={user.stories} title={`${user.username}'s stories...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <CollaboratorList
            username={user.username}
            collaboratorCount={user.collaboratorCount}
            collaborators={user.collaborators}
          />
        </div>
      </div>
      
    </div>
  );
};

export default MyStories;

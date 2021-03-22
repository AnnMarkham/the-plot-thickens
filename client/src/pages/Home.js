import React from 'react';
import StoryList from '../components/StoryList';
import StoryForm from '../components/StoryForm';
import CollaboratorList from '../components/CollaboratorList';


import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_STORIES, QUERY_ME_BASIC } from '../utils/queries';
//execute query for Stories (works like fethch -returns a promise)
//loading indicates info not returned yet. returned info stores in data.
const Home = () => {
  const { loading, data } = useQuery(QUERY_STORIES);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  //if data exists store it in stories (then we can use data.stories)
  const stories= data?.stories || [];
  console.log(stories)

  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <StoryForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
      ) : (
        <StoryList stories={stories} title="Stories" />
      )}
    </div>
    {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <CollaboratorList
              username={userData.me.username}
              collaboratorCount={userData.me.collaboratorCount}
              collaborators={userData.me.collaborators}
            />
    </div>
    ): null}
  </div>
</main>
  );
};

export default Home;
import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_STORIES } from '../utils/queries';
import StoryList from '../components/StoryList';

//execute query for Stories (works like fethch -returns a promise)
//loading indicates info not returned yet. returned info stores in data.
const Home = () => {
  const { loading, data } = useQuery(QUERY_STORIES);
  //if data exists store it in stories (then we can use data.stories)
  const stories= data?.stories || [];
  console.log(stories)
  return (
<main>
  <div className="flex-row justify-space-between">
    <div className="col-12 mb-3">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <StoryList stories={stories} title="Stories" />
      )}
    </div>
  </div>
</main>
  );
};

export default Home;
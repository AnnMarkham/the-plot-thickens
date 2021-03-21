import { useParams } from 'react-router-dom';

import StoryList from '../components/StoryList';
import CollaboratorList from '../components/CollaboratorList';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const MyStories = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  const user = data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {user.username}'s stories.
        </h2>
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
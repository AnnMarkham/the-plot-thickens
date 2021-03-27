import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_STORY } from '../utils/queries';
import NoteList from '../components/NotesList'
import NoteForm from '../components/NoteForm';
import Auth from '../utils/auth';

const SingleStory = props => {
  const { id: storyId } = useParams();
  
  const { loading, data } = useQuery(QUERY_STORY, {
    variables: { id: storyId }
  });

  const story = data?.story || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className= "row">
      <div className="story-list-card">
        <h3>{story.username}</h3>
        <p className="card-header">
          <span style={{ fontWeight: 400 }} className="text-light">
            </span>{" "}
          story on {story.createdAt}
        </p>
        <div className="card-body">
          <p>{story.storyText}</p>
        </div>
      </div>
      {story.noteCount > 0 && (<NoteList notes={story.notes} />
      )}

      {Auth.loggedIn() && <NoteForm storyId={story._id} />}
    </div>
  );
};

export default SingleStory;
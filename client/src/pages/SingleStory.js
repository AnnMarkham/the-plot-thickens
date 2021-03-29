import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_STORY, QUERY_STORIES, } from '../utils/queries';
import NoteList from '../components/NotesList'
import NoteForm from '../components/NoteForm';
import Auth from '../utils/auth';
import { DELETE_STORY } from '../utils/mutations'

const SingleStory = props => {
  const { id: storyId } = useParams();
  
  const { loading, data } = useQuery(QUERY_STORY, {
    variables: { id: storyId }
  });

  const [deleteStory, {error}] = useMutation(DELETE_STORY);
  const story = data?.story || {};
  
  const handleDeleteStory = async (storyId) =>{
        try {
      await deleteStory({
        variables: { storyId },
      });

      if (error) {
        throw new Error("Something went wrong");
      }

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
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
          <button className="btn col-12 col-md-3" type="click">
          Delete this Story {() => handleDeleteStory(story.storyId)}
                  
        </button> 
        </div>
      <div>
        {story.noteCount > 0 && (<NoteList notes={story.notes} />
      )}
      </div>
      {Auth.loggedIn() && <NoteForm storyId={story._id} />}
    </div>
  );
};

export default SingleStory;
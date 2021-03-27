import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_STORY } from '../../utils/mutations';
import { QUERY_STORIES, QUERY_ME } from '../../utils/queries';

const StoryForm = () => {
  const [storyText, setText] = useState('');
  
  const [addStory] = useMutation(ADD_STORY, {
    update(cache, { data: { addStory } }) {
      try {
        // update story array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { stories } = cache.readQuery({ query: QUERY_STORIES });
        cache.writeQuery({
          query: QUERY_STORIES,
          data: { stories: [addStory, ...stories] }
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, stories: [...me.stories, addStory] } }
      });
    }
  });

  // update state based on form input changes
  const handleChange = event => {
      setText(event.target.value);
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addStory({
        variables: { storyText }
      });

      // clear form value
      setText('');
      
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="row">
      
      <form
        className="col s12"
        onSubmit={handleFormSubmit}
      >
        <input
          placeholder="Enter new story text here."
          value={storyText}
          className="story-text"
          onChange={handleChange}
        ></input>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
   </div>
  );
};

export default StoryForm;
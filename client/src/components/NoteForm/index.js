import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_NOTE } from '../../utils/mutations';

const NoteForm = ({ storyId }) => {
  const [noteBody, setBody] = useState('');
  const [addNote] = useMutation(ADD_NOTE);

  // update state based on form input changes
  const handleChange = event => {
       setBody(event.target.value);
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addNote({
        variables: { noteBody, storyId }
      });

      // clear form value
      setBody('');
    } catch (e) {
      console.error(e);
    }
  };

  return (

      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <input
          placeholder="Leave a note or idea related to this story..."
          value={noteBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></input>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>


  );
};

export default NoteForm;
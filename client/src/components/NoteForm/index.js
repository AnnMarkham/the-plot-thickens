import React, { useState } from "react";
import { ADD_NOTE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const NoteForm = ({ storyId }) => {
  const [noteBody, setBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addNote, { error }] = useMutation(ADD_NOTE);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addNote({
        variables: { noteBody, storyId }
      });
    
    setBody("");
    setCharacterCount(0);
    } catch (e) {
      console.error(0);
    }
  };

  return (
    <div>
     
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a note related to this story..."
          value={noteBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
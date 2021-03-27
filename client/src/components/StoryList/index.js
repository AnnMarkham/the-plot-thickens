import React from 'react';
import { Link } from 'react-router-dom';

const StoryList = ({ stories, title }) => {
  /*if (!stories.length) {
    return <h3>No Stories Yet</h3>;
  }*/

  return (
    <div className="row">
      <h2>{title}</h2>
        {stories && stories.map(story => (
          <div key={story._id} className="story-list-card">
            <p className="card-header">
              <Link 
              to={`mystories/${story.username}`}
              style={{ fontWeight: 400 }}
              className="text-light"
              >
              {story.username}
              </Link>{""}
              story started on { story.createdAt }
            </p>

            <div className="card-body">
              <Link to={`/story/${story._id}`}>
                <p>{story.storyText}</p>
                <p className="mb-0">
                   {story.noteCoutnCount} || Click to{" "}
                  {story.noteCount ? "see" : "add"} a note!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};


export default StoryList;


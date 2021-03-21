import React from 'react';

const StoryList = ({ stories, title }) => {
  if (!stories.length) {
    return <h3>No Stories Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {stories &&
        stories.map(story => (
          <div key={story._id} className="card mb-3">
            <p className="card-header">
              {story.username}
              story on {story.createdAt}
            </p>
            <div className="card-body">
              <p>{story.storyText}</p>
              <p className="mb-0">
                Notes: {story.noteCount} || Click to{' '}
                {story.noteCount ? 'see' : 'add'} add a note!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default StoryList;
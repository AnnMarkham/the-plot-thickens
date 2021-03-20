import React from 'react';

const SingleStory = props => {
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            Username
          </span>{' '}
          story on createdAt
        </p>
        <div className="card-body">
          <p>Story Text</p>
        </div>
      </div>
    </div>
  );
};

export default SingleStory;
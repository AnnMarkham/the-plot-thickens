import React from 'react';
import { Link } from 'react-router-dom';

const CollaboratorList = ({ collaboratorCount, username, collaborators }) => {
  if (!collaborators || !collaborators.length) {
    return <p className="bg-dark text-light p-3">{username}, collaborate with someone!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {collaboratorCount} {collaboratorCount === 1 ? 'collaborator' : 'collaborators'}
      </h5>
      {collaborators.map(collaborator => (
        <button className="btn w-100 display-block mb-2" key={collaborator._id}>
          <Link to={`/mystories/${collaborator.username}`}>{collaborator.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default CollaboratorList;
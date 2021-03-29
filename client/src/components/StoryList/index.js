import React from 'react';
import { Link } from 'react-router-dom';


const StoryList = ({ stories, title }) => {
  /*if (!stories.length) {
    return <h3>No Stories Yet</h3>;
  }*/

  return (
    <div className="flex-row story-list">
       <h2>{title}</h2>
       <div className="col s12">
         <div>
            {stories && stories.map(story => (
            <div key={story._id} className="card-large">
            <p>
              <Link 
              to={`mystories/${story.username}`}
              style={{ fontWeight: 400 }}
              className="text-light"
              >
              {story.username}
              </Link>{""}
              story started on { story.createdAt }
            </p>
            <div className="card-content">
              <Link to={`/story/${story._id}`}>
                <p>{story.storyText}</p>
              </Link>
              
              <div className="row">
                <div className="card-tabs col s12">
                  <ul className="tabs">
                    <li className="tab col s3">Add Setting     </li>
                    <li className="tab col s3">Add Characters  </li>
                  </ul>              
                </div>
              </div>

            </div>
          </div>
       
        ))}
        </div>
        </div>
    </div>
  );
};


export default StoryList;


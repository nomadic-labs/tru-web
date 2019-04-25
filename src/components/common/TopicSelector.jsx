import React from 'react';

import { TOPICS } from "../../utils/constants";
import plants10 from "../../assets/images/illustrations/plants-10.svg";



const TopicSelector = props => {
  return(
    <div className="topic-selector p-5 pt-40 pb-80">
      <div className="image">
        <img src={plants10} style={{ width: "120px", height: "120px" }} />
      </div>
      <div className="topics mt-4">
        <h4>Filter by Topic</h4>
        <ul>
        {
          TOPICS.map(topic => {
            return(
              <li className="topic" key={ topic.value }>
                <span className="text">{ topic.label }</span>
              </li>
            )
          })
        }
        </ul>
      </div>
    </div>
  )
}

export default TopicSelector;
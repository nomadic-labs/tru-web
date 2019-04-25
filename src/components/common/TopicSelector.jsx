import React from 'react';
import { connect } from "react-redux";

import { TOPICS } from "../../utils/constants";
import plants10 from "../../assets/images/illustrations/plants-10.svg";

import { selectTopic } from "../../redux/actions";

const mapDispatchToProps = dispatch => {
  return {
    selectTopic: (topic) => {
      dispatch(selectTopic(topic));
    },
  };
};

const mapStateToProps = state => {
  return {
    selectedTopics: state.topics.selected,
  };
};


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
            const onClick = () => props.selectTopic(topic);
            const selected = (topic === props.selectedTopics) ? 'selected' : '';
            return(
              <li className={`topic ${selected}`} key={ topic.value }>
                <a className="text" onClick={onClick}>{ topic.label }</a>
              </li>
            )
          })
        }
        </ul>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicSelector);

import React from 'react';
import { connect } from "react-redux";
import { StaticQuery, graphql } from "gatsby";

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
    <StaticQuery
      query={graphql`
        query {
          allTopics {
            edges {
              node {
                id
                label
              }
            }
          }
        }
      `}
      render={data => {
        const topics = data.allTopics.edges.map(edge => edge.node);
        return(
          <div className="topic-selector p-5 pt-40 pb-80">
            <div className="image">
              <img src={plants10} style={{ width: "120px", height: "120px" }} />
            </div>
            <div className="topics mt-4">
              <h4>Filter by Topic</h4>
              <ul>
              {
                topics.map(topic => {
                  const onClick = () => props.selectTopic(topic);
                  const selected = (topic === props.selectedTopics) ? 'selected' : '';
                  return(
                    <li className={`topic ${selected}`} key={ topic.id }>
                      <a className="text" onClick={onClick}>{ topic.label }</a>
                    </li>
                  )
                })
              }
              </ul>
            </div>
          </div>
        )}
      }
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicSelector);

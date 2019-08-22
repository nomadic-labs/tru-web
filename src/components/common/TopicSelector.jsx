import React from 'react';
import { connect } from "react-redux";
import { StaticQuery, graphql } from "gatsby";


import { selectTopic, unselectTopic } from "../../redux/actions";

const mapDispatchToProps = dispatch => {
  return {
    selectTopic: (topic) => {
      dispatch(selectTopic(topic));
    },
    unselectTopic: (topic) => {
      dispatch(unselectTopic(topic));
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
          <div className="topic-selector pt-40 pb-80">
            <div className="topics mt-4">
              <h4>Filter by Topic</h4>
              <ul>
              {
                topics.map(topic => {
                  const selected = topic === props.selectedTopics;
                  const onClick = () => {
                    if (selected) {
                      props.unselectTopic(topic);
                    } else {
                      props.selectTopic(topic);
                    }
                  }
                  return(
                    <li className={`topic ${selected ? 'selected' : ''}`} key={ topic.id }>
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

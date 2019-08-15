import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { StaticQuery, Link, graphql } from "gatsby"
import Container from "./Container"
import Chip from "@material-ui/core/Chip"


const mapStateToProps = state => {
  return {
    page: state.page.data
  };
};

const PageTopics = props => (
  <StaticQuery
    query={graphql`
      query {
        allTopics {
          edges  {
            node {
              id
              label
            }
          }
        }
      }
    `}
    render={data => {
      if (!props.page.topics) {
        return null
      }

      const topicsArr = data.allTopics.edges.map(edge => edge.node);
      const topics = topicsArr.reduce((obj, topic) => {
        obj[topic.id] = topic.label
        return obj
      }, {})
      const tagsString = props.page.topics.map(tag => topics[tag]).join(", ")

      return(
        <div className="mt-40">
          {
            props.page.topics.map(id => {
              const label = topics[id]
              return <Chip key={id} className="my-2 mr-2" label={label} variant="outlined" color="primary" />
            })
          }
        </div>
      )
    }}
  />
);


export default connect(mapStateToProps, null)(PageTopics);
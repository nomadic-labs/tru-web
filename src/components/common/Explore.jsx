import React, { Component } from "react";
import { connect } from "react-redux";
import Collapsible from 'react-collapsible';
import { StaticQuery, Link, graphql } from "gatsby";

import { MENU_CATEGORIES } from "../../utils/constants";
import Affix from "./Affix";

import dylan7 from "../../assets/images/illustrations/Dylan_Minor7.png";

const mapStateToProps = state => {
  return {
    selectedTopics: state.topics.selected,
  };
};

const CategoryTitle = ({ label, count, open }) => {
  return(
    <div className={`category d-flex align-items-center justify-content-between ${open ? 'open' : ''}`}>
      <h4>
        {`${label} (${count})`}
      </h4>
      { open ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i> }
    </div>
  )
}

const ArticlePreview = ({ article, topics }) => {
  const image = article.header_image ? article.header_image.imageSrc : dylan7;
  const tags = article.topics || [];
  const tagsString = tags.map(tag => topics[tag]).join(", ")

  return(
    <div className="article col-12 col-md-4 my-3">
      <Link to={`/${article.slug}`}>
        <div
          className="image"
          style={{ background: `url(${image}) no-repeat center center`, backgroundSize: "cover", height: "180px" }}
        />
        <h5 className="mt-3 mb-1">{ article.title }</h5>
        <p className="text-dark-gray text-small">{ tagsString }</p>
      </Link>
    </div>
  )
}

class Research extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: this.props.pages,
    }
  }

  componentDidUpdate(prevProps) {
    console.log('prevProps', prevProps)
    console.log('this.props', this.props)
    if (this.props.selectedTopics && prevProps.selectedTopics != this.props.selectedTopics) {
      const topicId = this.props.selectedTopics.id
      const filteredPages = this.props.pages.filter(page => page.topics && page.topics.includes(topicId))
      console.log("filteredPages", filteredPages)
      this.setState({ pages: filteredPages })
    }
   }

  render() {

    return(
      <div className="explore">
        {
          MENU_CATEGORIES.map((category) => {
            let pages = this.state.pages.filter(article => article.navigation.group === category.value);

            if (pages.length > 0) {
              return(
                <div className="py-2" key={ category.value }>
                  <Collapsible
                    trigger={<CategoryTitle label={category.label} count={pages.length} />}
                    triggerWhenOpen={<CategoryTitle label={category.label} count={pages.length} open={true} />}
                    open={true}
                  >
                    <div className="row">
                    {
                      pages.map(page => (<ArticlePreview article={page} key={ page.slug } topics={this.props.topics} />))
                    }
                    </div>
                  </Collapsible>
                </div>
              )
            }
          })
        }
      </div>
    )
  }
}

const Explore = props => (
  <StaticQuery
    query={graphql`
      query {
        allPages {
          edges {
            node {
              title
              slug
              header_image {
                imageSrc
              }
              topics
              navigation {
                group
                order
                displayTitle
              }
            }
          }
        }
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
      const pages = data.allPages.edges.map(edge => edge.node);
      const topicsArr = data.allTopics.edges.map(edge => edge.node);
      const topics = topicsArr.reduce((obj, topic) => {
        obj[topic.id] = topic.label
        return obj
      }, {})

      return <Research {...props} pages={pages} topics={topics} />
    }}
  />
);


export default connect(mapStateToProps, null)(Explore);
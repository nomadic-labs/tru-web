import React, { Component } from "react";
import { connect } from "react-redux";
import Collapsible from 'react-collapsible';
import { StaticQuery, Link, graphql } from "gatsby";
import Grid from "@material-ui/core/Grid";

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
    <div className={`category d-flex align-items-center my-2 cursor-pointer text-primary ${open ? 'open' : ''}`}>
      { open ? <i className="fas fa-minus pr-3"></i> : <i className="fas fa-plus pr-3"></i> }
      <h4 className="mb-0">
        {`${label} (${count})`}
      </h4>
    </div>
  )
}

const ArticlePreview = ({ article, topics }) => {
  const image = article.header_image ? article.header_image.imageSrc : dylan7;
  const tags = article.topics || [];
  const tagsString = tags.map(tag => topics[tag]).join(", ")

  return(
    <Link to={`/${article.slug}`}>
      <div className="article d-flex pos-relative align-items-center pl-20 pt-20 pb-20">
        <div
          className="image pos-absolute"
          style={{ background: `url(${image}) no-repeat center center`, backgroundSize: 'cover' }}
        />
        <div className="ml-80 p-2 align-items-center pos-relative flex-grow bg-white info">
          <h4 className="mb-0">{ article.title }</h4>
          <div className="line mx-3"/>
          <p className="mb-0 topics">{ tagsString }</p>
        </div>
      </div>
    </Link>
  )
}

class Research extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: this.props.pages,
    }
  }

  sortPages = pages => {
    return pages.sort((a, b) => (a.order - b.order));
  }

  filterPagesByTopic = pages => {
    if (this.props.selectedTopics) {
      return pages.filter(page => page.topics && page.topics.includes(this.props.selectedTopics.id));
    }

    return pages;
  }

  filterPagesByCategory = (pages, category) => {
    return pages.filter(page => page.category === category.value);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedTopics != this.props.selectedTopics) {
      if (this.props.selectedTopics) {
        const topicId = this.props.selectedTopics.id
        const filteredPages = this.props.pages.filter(page => page.topics && page.topics.includes(topicId))
        return this.setState({ pages: filteredPages })
      }

      return this.setState({ pages: this.props.pages })
    }
   }

  render() {
    if (this.state.pages.length === 0) {
      return (
        <div className="explore">
          <div>No results.</div>
        </div>
      )
    }

    let categories = [];

    MENU_CATEGORIES.forEach(category => {
      const pages = this.sortPages(this.filterPagesByCategory(this.state.pages, category))

      if (pages.length > 0) {
        categories.push({ ...category, pages })
      }
    })

    return(
      <div className="explore">
        {
          categories.map((category, index) => {
            return(
              <div className="py-2" key={ category.value }>
                <Collapsible
                  trigger={<CategoryTitle label={category.label} count={category.pages.length} />}
                  triggerWhenOpen={<CategoryTitle label={category.label} count={category.pages.length} open={true} />}
                  open={index===0}
                  lazyRender={true}
                >
                  <div>
                  {
                    category.pages.map(page => (<ArticlePreview article={page} key={ page.slug } topics={this.props.topics} />))
                  }
                  </div>
                </Collapsible>
              </div>
            )
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
              category
              menuTitle
              order
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
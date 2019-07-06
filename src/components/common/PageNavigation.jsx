import React, { Component } from "react";
import { connect } from "react-redux";
import Collapsible from 'react-collapsible';
import { StaticQuery, Link, graphql } from "gatsby";
import { find } from "lodash"
import Grid from "@material-ui/core/Grid";
import Container from "./Container";

import dylan7 from "../../assets/images/illustrations/Dylan_Minor7.png";


const mapStateToProps = state => {
  return {
    currentPage: state.page.data.id,
    nextPage: state.page.data.next,
    prevPage: state.page.data.prev,
  };
};

const ArticlePreview = ({ article, category, topics }) => {
  const image = article.header_image ? article.header_image.imageSrc : dylan7;
  const tags = article.topics || [];
  const tagsString = tags.map(tag => topics[tag]).join(", ")

  return(
    <Link to={`/${article.slug}`}>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-3">
              <img src={image} className="img-fluid" />
            </div>

            <div className="col-9">
              <h4 className="">{ article.title }</h4>
              <p className="mb-0 topics">{ category.label }</p>
              <p className="mb-0 topics">{ tagsString }</p>
            </div>
          </div>

        </div>
      </div>
    </Link>
  )
}

class PageNavigationInner extends Component {
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
    return pages.filter(page => page.category === category.id);
  }

  nextCategory = category => {
    return this.props.categories[category.next];
  }

  prevCategory = category => {
    return this.props.categories[category.prev];
  }

  nextPage = page => {
    let nextPage = this.props.pages[page.next]

    if (nextPage) {
      return nextPage
    }

    const currentCategory = this.props.categories[page.category]

    if (!currentCategory) {
      return null
    }

    const nextCategory = this.nextCategory(currentCategory)
    nextPage = find(this.props.pages, page => { return (page.category === nextCategory.id) && !page.prev})

    if (nextPage) {
      return nextPage
    }

    return null
  }

  prevPage = page => {
    return this.props.pages[page.prev];
  }

  orderedCategories = (category, arr=[]) => {
    if (!category) {
      return arr
    }

    arr.push(category)
    return this.orderedCategories(this.nextCategory(category), arr)
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
    const page = this.props.pages[this.props.currentPage];
    const nextPage = this.nextPage(page)

    if (!nextPage) {
      return null
    }

    const category = this.props.categories[nextPage.category]
    return(
      <Container>
        <h3>Next Page</h3>
        <ArticlePreview article={nextPage} key={ nextPage.slug } topics={this.props.topics} category={category} />
      </Container>
    )
  }
}

const PageNavigation = props => (
  <StaticQuery
    query={graphql`
      query {
        allPages {
          edges {
            node {
              id
              title
              slug
              header_image {
                imageSrc
              }
              topics
              category
              menuTitle
              order
              prev
              next
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
        allCategories {
          edges  {
            node {
              id
              label
              next
              prev
            }
          }
        }
      }
    `}
    render={data => {
      const pagesArr = data.allPages.edges.map(edge => edge.node);
      const pages = pagesArr.reduce((obj, page) => {
        obj[page.id] = page
        return obj
      }, {})
      const topicsArr = data.allTopics.edges.map(edge => edge.node);
      const topics = topicsArr.reduce((obj, topic) => {
        obj[topic.id] = topic.label
        return obj
      }, {})
      const categoriesArr = data.allCategories.edges.map(edge => edge.node)
      const categories = categoriesArr.reduce((obj, cat) => {
        obj[cat.id] = cat
        return obj
      }, {})

      return <PageNavigationInner {...props} pages={pages} topics={topics} categories={categories} />
    }}
  />
);


export default connect(mapStateToProps, null)(PageNavigation);
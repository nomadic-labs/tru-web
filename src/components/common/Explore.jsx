import React, { Component } from "react";
import { connect } from "react-redux";
import Collapsible from 'react-collapsible';
import { StaticQuery, Link, graphql } from "gatsby";
import { find, filter } from "lodash"
import Grid from "@material-ui/core/Grid";

import { MENU_CATEGORIES } from "../../utils/constants";
import Affix from "./Affix";

import defaultImage from "../../assets/images/imperial-oil.jpg";


const mapStateToProps = state => {
  return {
    selectedTopics: state.topics.selected,
  };
};

const CategoryTitle = ({ label, count, open }) => {
  return(
    <div className={`category d-flex align-items-center my-2 cursor-pointer text-primary ${open ? 'open' : ''}`}>
      { open ? <i className="fas fa-minus pr-3"></i> : <i className="fas fa-plus pr-3"></i> }
      <h3 className="mb-0">
        {`${label} (${count})`}
      </h3>
    </div>
  )
}

const ArticlePreview = ({ article, topics }) => {
  const image = article.header_image ? article.header_image.imageSrc : defaultImage;
  const tags = article.topics || [];
  const tagsString = tags.map(tag => topics[tag]).join(", ")

  return(
    <Link to={`/${article.slug}`}>
      <div className="article d-md-flex align-items-center pl-30 pt-20 pb-20">
        <div
          className="image rounded mb-3 my-md-0"
          style={{ background: `url(${image}) no-repeat center center`, backgroundSize: 'cover' }}
        />
        <div className="p-md-4 align-items-center pos-relative flex-grow info">
          <h4 className="mb-2">{ article.title }</h4>
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

  filterPagesByCategory = (pages, category) => {
    return filter(pages, page => page.category === category.id);
  }

  nextCategory = category => {
    return this.props.categories[category.next];
  }

  prevCategory = category => {
    return this.props.categories[category.prev];
  }

  orderedCategories = (category, arr=[]) => {
    if (!category) {
      return arr
    }

    arr.push(category)
    return this.orderedCategories(this.nextCategory(category), arr)
  }

  nextPage = page => {
    return this.state.pages[page.next];
  }

  prevPage = page => {
    return this.state.pages[page.prev];
  }

  orderedPages = (page, arr=[]) => {
    if (!page) {
      return arr
    }

    arr.push(page)

    const nextPage = this.nextPage(page)
    if (page === nextPage) {
      return arr
    }
    return this.orderedPages(this.nextPage(page), arr)
  }

  filterPagesByTopic = pages => {
    if (this.props.selectedTopics) {
      return pages.filter(page => page.topics && page.topics.includes(this.props.selectedTopics.id));
    }

    return pages;
  }

  render() {

    const pagesByCategory = [];
    const orderedCategories = this.orderedCategories(find(this.props.categories, cat => !cat.prev));

    orderedCategories.forEach(category => {
      const categoryPages = this.filterPagesByCategory(this.props.pages, category)
      const pages = this.filterPagesByTopic(this.orderedPages(categoryPages.find(page => !page.prev)))

      if (pages.length > 0) {
        pagesByCategory.push({ ...category, pages })
      }
    })

    return(
      <div className="explore">
        {
          pagesByCategory.map((category, index) => {
            return(
              <div className="py-2" key={ category.id }>
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
              id
              title
              slug
              header_image {
                imageSrc
              }
              topics
              category
              menuTitle
              next
              prev
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

      return <Research {...props} pages={pages} topics={topics} categories={categories} />
    }}
  />
);


export default connect(mapStateToProps, null)(Explore);
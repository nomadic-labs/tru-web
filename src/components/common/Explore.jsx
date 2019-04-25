import React, { Component } from "react";
import Collapsible from 'react-collapsible';
import { StaticQuery, Link, graphql } from "gatsby";
import { MENU_CATEGORIES } from "../../utils/constants";
import Affix from "./Affix";

import dylan7 from "../../assets/images/illustrations/Dylan_Minor7.png";

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

const ArticlePreview = ({ article }) => {
  const image = article.header_image ? article.header_image.imageSrc : dylan7;
  const topics = JSON.parse(article.topics) || [];
  const topicsString = topics.map(topic => topic.label).join(", ")
  console.log('topics', topics)
  return(
    <div className="article col-12 col-md-4 my-3">
      <Link to={`/${article.slug}`}>
        <div
          className="image"
          style={{ background: `url(${image}) no-repeat center center`, backgroundSize: "cover", height: "180px" }}
        />
        <h5 className="mt-3 mb-1">{ article.title }</h5>
        <p className="text-dark-gray text-small">{ topicsString }</p>
      </Link>
    </div>
  )
}

class Research extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="explore">
        {
          MENU_CATEGORIES.map((category, index) => {
            const articles = this.props.pages.filter(page => page.node.navigation.group === category.value)
            if (articles.length > 0) {
              return(
                <div className="py-2" key={ category.value }>
                  <Collapsible
                    trigger={<CategoryTitle label={category.label} count={articles.length} />}
                    triggerWhenOpen={<CategoryTitle label={category.label} count={articles.length} open={true} />}
                    open={true}
                  >
                    <div className="row">
                    {
                      articles.map(article => (<ArticlePreview article={article.node} key={ article.node.slug } />))
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
      }
    `}
    render={data => (
      <Research {...props} pages={data.allPages.edges} />
    )}
  />
);


export default Explore;
import React, { Component } from "react";
import Collapsible from 'react-collapsible';
import { StaticQuery, Link } from "gatsby";
import { MENU_CATEGORIES } from "../../utils/constants";
import Affix from "./Affix";

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
                      articles.map(article => (
                        <div className="article col-12 col-md-4 my-3" key={ article.node.slug }>
                          <div className="image">
                            <img src="https://via.placeholder.com/300x150" className="img-fluid" />
                          </div>
                          <h5 className="my-2"><Link to={`/${article.node.slug}`}>{article.node.title}</Link></h5>
                        </div>
                      ))
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
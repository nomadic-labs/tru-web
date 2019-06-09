import React from 'react'
import { graphql } from 'gatsby'
import { connect } from "react-redux";
import { map, find } from 'lodash'
import slugify from "slugify";
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';


import Layout from '../layouts/default';
import ProtectedPage from "../layouts/protected-page"
import Container from "../components/common/Container"

import {
  pushTopic,
  removeTopic,
  pushCategory,
  removeCategory,
  setTopics,
  setCategories,
  fetchTopics,
  fetchCategories
} from "../redux/actions";


const mapDispatchToProps = dispatch => {
  return {
    pushTopic: topic => {
      dispatch(pushTopic(topic));
    },
    removeTopic: topic => {
      dispatch(removeTopic(topic));
    },
    setTopics: topics => {
      dispatch(setTopics(topics));
    },
    fetchTopics: () => {
      dispatch(fetchTopics())
    },
    pushCategory: category => {
      dispatch(pushCategory(category));
    },
    removeCategory: category => {
      dispatch(removeCategory(category));
    },
    setCategories: categories => {
      dispatch(setCategories(categories));
    },
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
  };
};

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
    categories: state.categories.categories,
    topics: state.topics.topics
  };
};

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicLabel: "",
      categoryLabel: "",
      pages: this.props.data.allPages.edges.map(edge => edge.node),
    }
    this.props.fetchTopics()
    this.props.fetchCategories()
  }

  createTopic = () => {
    const label = this.state.topicLabel
    const id = slugify(label, {
      lower: true,
      remove: /[$*_+~.,()'"!\-:@%^&?=]/g
    })

    const topic = { id, label }
    this.props.pushTopic(topic);
    this.setState({ topicLabel: "" })
  }

  createCategory = () => {
    const label = this.state.categoryLabel
    const id = slugify(label, {
      lower: true,
      remove: /[$*_+~.,()'"!\-:@%^&?=]/g
    })

    const category = { id, label }
    this.props.pushCategory(category);
    this.setState({ categoryLabel: "" })
  }

  filterPagesByCategory = (pages, category) => {
    return pages.filter(page => page.category === category.id);
  }

  sortPages = pages => {
    return pages.sort((a, b) => (a.order - b.order));
  }

  nextCategory = category => {
    console.log(category)
    return this.props.categories[category.next];
  }

  prevCategory = category => {
    return this.props.categories[category.prev];
  }

  orderedCategories = (category, arr=[]) => {
    if (!category) {
      console.log('return arr!')
      return arr
    }

    arr.push(category)
    return this.orderedCategories(this.nextCategory(category), arr)
  }

  render() {
    const pagesByCategory = [];
    const orderedCategories = this.orderedCategories(find(this.props.categories, cat => !cat.prev));

    orderedCategories.forEach(category => {
      const pages = this.sortPages(this.filterPagesByCategory(this.state.pages, category))

      if (pages.length > 0) {
        pagesByCategory.push({ ...category, pages })
      }
    })

    return(
      <Layout>
        <ProtectedPage>
          <h1 className="text-center">
            Website Configuration
          </h1>

          <Container>
            <h2>Topics</h2>
            <div className="my-4">
              {
                map(this.props.topics, topic => {
                  return (
                    <Chip
                      className="my-2 mr-2"
                      key={topic.id}
                      label={topic.label}
                      onDelete={() => props.removeTopic(topic)}
                    />
                  )
                })
              }
              <div className="my-2">
                <FormControl>
                  <TextField
                    variant="outlined"
                    label="New topic"
                    margin="dense"
                    id="topic"
                    value={this.state.topicLabel}
                    onChange={(e) => this.setState({ topicLabel: e.target.value })}
                  />
                </FormControl>
              </div>
              <div className="my-2">
                <Button onClick={this.createTopic} variant="contained" color="primary">Create</Button>
              </div>
            </div>
          </Container>

          <Container>
            <h2>Categories</h2>
            <div className="my-4">
              { orderedCategories.map(cat => (
                <Chip
                  className="my-2 mr-2"
                  key={cat.id}
                  label={cat.label}
                  onDelete={() => props.removeTopic(cat)}
                />
              ))}
              <div className="my-2">
                <FormControl>
                  <TextField
                    variant="outlined"
                    label="New category"
                    margin="dense"
                    id="category"
                    value={this.state.categoryLabel}
                    onChange={(e) => this.setState({ categoryLabel: e.target.value })}
                  />
                </FormControl>
              </div>
              <div className="my-2">
                <Button onClick={this.createCategory} variant="contained" color="primary">Create</Button>
              </div>
            </div>

          </Container>

          <Container>
            <h2>Page Order</h2>
            <div className="my-4">
              {
                pagesByCategory.map(category => {
                  return(
                    <div>
                      <p>{category.label}</p>
                      {
                        category.pages.map(page => {
                          return(
                            <div className="ranked-item">
                              <IconButton size="small" color="primary"><ArrowUp /></IconButton>
                              <IconButton size="small" color="primary"><ArrowDown /></IconButton>
                              <span className="ml-3">{page.title}</span>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                })
              }
            </div>
          </Container>
        </ProtectedPage>
      </Layout>
    )
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);

export const query = graphql`
  query {
    allPages(filter: {template: { in: ["single-column.js", "fixed-sidebar.js"]}}) {
      edges {
        node {
          id
          title
          slug
          order
          category
          menuTitle
        }
      }
    }
  }
`;
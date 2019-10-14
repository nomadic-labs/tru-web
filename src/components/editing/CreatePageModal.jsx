import React from "react";
import slugify from "slugify";
import { StaticQuery, graphql } from "gatsby";
import { map, find } from 'lodash';

import { connect } from "react-redux";
import {
  toggleNewPageModal,
  createPage,
  updateFirebaseData,
  fetchTopics,
  fetchCategories,
  fetchPages,
} from "../../redux/actions";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from '@material-ui/core/Chip';

import { PAGE_TYPES, PALETTE_OPTIONS } from "../../utils/constants";

import defaultContentJSON from "../../fixtures/pageContent.json";

const mapStateToProps = state => {
  return {
    showNewPageModal: state.adminTools.showNewPageModal,
    newPage: state.adminTools.newPage,
    page: state.page.data,
    categories: state.categories.categories,
    topics: state.topics.topics,
    pages: state.pages.pages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleNewPageModal: () => {
      dispatch(toggleNewPageModal());
    },
    updateFirebaseData: (data, callback) => {
      dispatch(updateFirebaseData(data, callback))
    },
    createPage: (pageData, pageId) => {
      dispatch(createPage(pageData, pageId));
    },
    fetchTopics: () => {
      dispatch(fetchTopics())
    },
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    fetchPages: () => {
      dispatch(fetchPages())
    },
  };
};

const emptyPage = {
    title: "",
    category: "",
    palette: "default",
    topics: [],
    type: PAGE_TYPES[0].value,
  }

class CreatePageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        ...this.props.page,
        topics: this.props.page.topics || [],
        category: this.props.page.category || "",
        palette: this.props.page.palette || "default",
      }
    };
    this.updatePage = (field, value) => {
      this._updatePage(field, value);
    };
    this.onSubmit = () => {
      this._onSubmit();
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.newPage != this.props.newPage) {
      this.setState({ page: this.props.newPage ? emptyPage : {
        ...this.props.page,
        topics: this.props.page.topics || [],
        category: this.props.page.category || "",
        palette: this.props.page.palette || "default",
      } })
    }

    if (!prevProps.showNewPageModal && this.props.showNewPageModal) {
      this.props.fetchTopics()
      this.props.fetchCategories()
      this.props.fetchPages()
    }
  }

  _updatePage(field, value) {
    this.setState({
      page: {
        ...this.state.page,
        [field]: value
      }
    });
  }

  _onSubmit() {
    const slugifiedTitle = slugify(this.state.page.title, {
      lower: true,
      remove: /[$*_+~.,()'"!\-:@%^&?=]/g
    })

    const lastPageInCategory = Boolean(this.state.page.category) ? find(this.props.pages, (page => page.category === this.state.page.category && !page.next)) : null;

    let pageData = {
      title: this.state.page.title,
      category: this.state.page.category,
      palette: this.state.page.palette,
      topics: this.state.page.topics,
    };

    if (this.props.newPage) {
      pageData.content = defaultContentJSON;
      pageData.slug = `${this.state.page.category}/${slugifiedTitle}`;
      pageData.template = this.state.page.type.template;
      pageData.prev = lastPageInCategory ? lastPageInCategory.id : null;
    }

    const pageId = this.props.newPage ? slugifiedTitle : this.props.page.id;

    this.props.createPage(pageData, pageId);

    if (lastPageInCategory) {
      this.props.updateFirebaseData({
        [`pages/${lastPageInCategory.id}/next`]: pageId,
      })
    }
  }

  render() {
    const open = Boolean(this.props.showNewPageModal);

    return (
      <Dialog open={open} aria-labelledby="create-page-dialogue">
        <DialogTitle id="create-page-dialogue">
          { this.props.newPage ? "Create new page" : "Page Configuration" }
        </DialogTitle>


        <DialogContent>
          {
            this.props.newPage &&
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="page-type">Select page type</InputLabel>
              <Select
                value={this.state.page.type}
                onChange={selected =>
                  this.updatePage("type", selected.target.value)
                }
                inputProps={{
                  name: "page-type",
                  id: "page-type"
                }}
              >
                {PAGE_TYPES.map(type => (
                  <MenuItem key={type.label} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }

          <FormControl fullWidth margin="normal">
            <TextField
              className="form-control"
              type="text"
              label={"Page title"}
              value={this.state.page.title}
              onChange={e => this.updatePage("title", e.currentTarget.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="menu-group">Select palette (optional)</InputLabel>
            <Select
              value={this.state.page.palette}
              onChange={selected =>
                this.updatePage("palette", selected.target.value)
              }
              inputProps={{
                name: "menu-group",
                id: "menu-group"
              }}
            >
              {PALETTE_OPTIONS.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="menu-group">Select category (optional)</InputLabel>
            <Select
              value={this.state.page.category}
              onChange={selected =>
                this.updatePage("category", selected.target.value)
              }
              inputProps={{
                name: "menu-group",
                id: "menu-group"
              }}
            >
              {map(this.props.categories, (category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.label}
                </MenuItem>
              )))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="select-multiple-tag">Tags (optional)</InputLabel>
            <Select
              multiple
              value={this.state.page.topics}
              onChange={selected =>
                this.updatePage("topics", selected.target.value)
              }
              input={<Input id="select-multiple-tag" />}
              renderValue={selected => (
                <div>
                  {selected.map(topic => {
                    const label = find(this.props.topics, ((t, key) => key === topic))
                    return <Chip key={topic} label={label.label} className="mx-1" />
                  })}
                </div>
              )}
            >
              {map(this.props.topics, ((topic, key) => (
                <MenuItem key={key} value={key}>
                  {topic.label}
                </MenuItem>
              )))}
            </Select>
          </FormControl>

        </DialogContent>

        <DialogActions>
          <Button color="default" onClick={this.props.onToggleNewPageModal}>
            Close
          </Button>
          <Button color="secondary" onClick={this.onSubmit}>
            { this.props.newPage ? "Create page" : "Save" }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}


CreatePageModal.defaultProps = {
  page: emptyPage
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CreatePageModal
);

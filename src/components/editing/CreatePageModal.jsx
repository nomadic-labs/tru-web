import React from "react";
import slugify from "slugify";
import { StaticQuery, graphql } from "gatsby";
import { filter, orderBy } from 'lodash';

import { connect } from "react-redux";
import { toggleNewPageModal, createPage } from "../../redux/actions";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { PAGE_TYPES, MENU_CATEGORIES } from "../../utils/constants";

import defaultContentJSON from "../../fixtures/pageContent.json";

const mapStateToProps = state => {
  return {
    showNewPageModal: state.adminTools.showNewPageModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleNewPageModal: () => {
      dispatch(toggleNewPageModal());
    },
    createPage: (pageData, pageId) => {
      dispatch(createPage(pageData, pageId));
    }
  };
};

class CreatePageModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        title: "",
        type: "",
        navigationGroup: "",
        displayTitle: ""
      }
    };
    this.updatePage = (field, value) => {
      this._updatePage(field, value);
    };
    this.onSubmit = () => {
      this._onSubmit();
    };
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
    const pageData = {
      title: this.state.page.title,
      slug: `${this.state.page.navigationGroup}/${slugifiedTitle}`,
      template: this.state.page.type.template,
      navigation: {
        group: this.state.page.navigationGroup,
        displayTitle: this.state.page.displayTitle,
      },
      content: defaultContentJSON
    };

    this.props.createPage(pageData, slugifiedTitle);
  }

  render() {
    const open = Boolean(this.props.showNewPageModal);

    return (
      <Dialog open={open} aria-labelledby="create-page-dialogue">
        <DialogTitle id="create-page-dialogue">Add new page</DialogTitle>

        <DialogContent>
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
            <TextField
              name="page_display_title"
              className="form-control"
              type="text"
              label={"Title to display in menu (optional)"}
              value={this.state.page.displayTitle}
              onChange={e =>
                this.updatePage("displayTitle", e.currentTarget.value)
              }
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="menu-group">Select menu group (optional)</InputLabel>
            <Select
              value={this.state.page.navigationGroup}
              onChange={selected =>
                this.updatePage("navigationGroup", selected.target.value)
              }
              inputProps={{
                name: "menu-group",
                id: "menu-group"
              }}
            >
              {MENU_CATEGORIES.map(group => (
                <MenuItem key={group.label} value={group.value}>
                  {group.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </DialogContent>

        <DialogActions>
          <Button color="default" onClick={this.props.onToggleNewPageModal}>
            Close
          </Button>
          <Button color="secondary" onClick={this.onSubmit}>
            Create Page
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const CreatePageModalContainer = props => (
  <StaticQuery
    query={graphql`
      query {
        allPages {
          edges {
            node {
              id
              title
              slug
              navigation {
                order
                displayTitle
              }
            }
          }
        }
      }
    `}
    render={data => (
      <CreatePageModalComponent {...props} />
    )}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(
  CreatePageModalContainer
);

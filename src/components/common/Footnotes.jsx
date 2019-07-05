import React from "react";
import { Link } from "gatsby";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button"

import {
  updateFootnote,
  saveFootnote,
  removeFootnote
} from "../../redux/actions";

import Container from "./Container";
import { EditableParagraph } from "react-easy-editables";

const mapDispatchToProps = dispatch => {
  return {
    addFootnote: (footnote) => {
      dispatch(addFootnote(footnote))
    },
    saveFootnote: (id, footnote) => {
      dispatch(saveFootnote(id, footnote))
    },
    removeFootnote: (id) => {
      dispatch(removeFootnote(id))
    },
  };
};

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
    footnotes: state.page.data.footnotes,
  };
};


class Footnotes extends React.Component {
  constructor(props) {
    super(props);
  }

  addFootnote = () => {
    const id = `fn:${Date.now()}`;
    const footnote = { id, type: "footnote", content: { text: "<p>Footnote placeholder</p>" } }
    this.props.saveFootnote(id, footnote)
  }

  updateFootnote = id => content => {
    const updatedFootnote = { ...this.props.footnotes[id], content }
    this.props.saveFootnote(id, updatedFootnote)
  }

  deleteFootnote = id => () => {
    this.props.removeFootnote(id)
  }

  render() {
    const footnoteKeys = this.props.footnotes ? Object.keys(this.props.footnotes) : [];
    if (!this.props.isEditingPage && footnoteKeys.length < 1) {
      return <div />
    }

    return (
      <section className="footnotes-section pt-60 pb-60">
        <Container>
          <h2>Notes</h2>
          <div className="footnotes">
            {
              footnoteKeys.map((key, index) => {
                const footnote = this.props.footnotes[key];
                return(
                  <div className="footnote mb-20 mt-20" id={key} key={key}>
                    <EditableParagraph content={footnote.content} onSave={this.updateFootnote(key)} onDelete={this.deleteFootnote(key)} />
                    {
                      this.props.isEditingPage &&
                      <p>
                        Reference: <code>{`#${key}`}</code>
                      </p>
                    }
                  </div>
                )
              })
            }
          </div>
          {
            this.props.isEditingPage &&
            <div className="pt-10 pb-10">
              <Button onClick={this.addFootnote}>Add footnote</Button>
            </div>
          }
        </Container>
      </section>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footnotes);


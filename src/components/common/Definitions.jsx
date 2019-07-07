import React from "react";
import { Link } from "gatsby";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button"

import {
  updateDefinition,
  saveDefinition,
  removeDefinition
} from "../../redux/actions";

import Container from "./Container";
import { EditableText } from "react-easy-editables";

const mapDispatchToProps = dispatch => {
  return {
    addDefinition: (definition) => {
      dispatch(addDefinition(definition))
    },
    saveDefinition: (id, definition) => {
      dispatch(saveDefinition(id, definition))
    },
    removeDefinition: (id) => {
      dispatch(removeDefinition(id))
    },
  };
};

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
    definitions: state.page.data.definitions,
  };
};


class Definitions extends React.Component {
  constructor(props) {
    super(props);
  }

  addDefinition = () => {
    const id = `def:${Date.now()}`;
    const defaultDefinition = {
      id,
      type: "definition",
      original: {
        content: { text: "Original" }
      },
      definition: {
        content: { text: "Definition" }
      }
    }
    this.props.saveDefinition(id, defaultDefinition)
  }

  updateDefinition = id => content => {
    const updatedDefinition = {
      ...this.props.definitions[id],
      definition: {
        ...this.props.definitions[id].definition,
        content
      }
    }
    this.props.saveDefinition(id, updatedDefinition)
  }

  updateOriginal = id => content => {
    const updatedDefinition = {
      ...this.props.definitions[id],
      original: {
        ...this.props.definitions[id].definition,
        content
      }
    }
    this.props.saveDefinition(id, updatedDefinition)
  }

  deleteDefinition = id => () => {
    this.props.removeDefinition(id)
  }

  render() {
    const definitionKeys = this.props.definitions ? Object.keys(this.props.definitions) : [];
    if (!this.props.isEditingPage && definitionKeys.length < 1) {
      return <div />
    }

    return (
      <div className="definitions-section mb-40">
        <h3 className="">Glossary</h3>
        <div className="definitions">
          {
            definitionKeys.map((key, index) => {
              const definition = this.props.definitions[key];
              return(
                <div className={`definition mb-20 mt-20 ${this.props.isEditingPage ? '' : 'd-flex'}`} key={key}>
                  <span><em><EditableText content={definition.original.content} onSave={this.updateOriginal(key)} onDelete={this.deleteDefinition(key)} /></em></span>
                  <span>&nbsp;--&nbsp;</span>
                  <span id={key}><EditableText content={definition.definition.content} onSave={this.updateDefinition(key)} onDelete={this.deleteDefinition(key)} /></span>

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
            <Button color="primary" variant="outlined" onClick={this.addDefinition}>Add definition</Button>
          </div>
        }
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Definitions);


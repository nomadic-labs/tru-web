import React from "react";
import PropTypes from "prop-types";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import {
  PlainTextEditor,
  LinkEditor,
  Editable
} from 'react-easy-editables';

import { uploadImage, uploadFile } from "../../firebase/operations"

class ReferenceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.content };
  }

  handleEditorChange = field => item => {
    this.setState({
      content: {
        ...this.state.content,
        [field]: {
          ...item
        }
      }
    });
  }

  render() {
    const { content } = this.state;

    return(
      <div className={'reference'}>
        <h5 className="">
          <LinkEditor
            content={content["reference-link"]}
            onContentChange={this.handleEditorChange("reference-link")}
          />
        </h5>

        <div className="text-italic mb-2">
          <PlainTextEditor
            content={content["reference-details"]}
            onContentChange={this.handleEditorChange("reference-details")}
          />
        </div>

        <div className="text-italic mb-2">
          <PlainTextEditor
            content={content["reference-description"]}
            onContentChange={this.handleEditorChange("reference-description")}
          />
        </div>
      </div>
    )
  }
}

const Reference = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  return (
    <Editable
      Editor={ReferenceEditor}
      handleSave={handleSave}
      content={content}
      {...props}
    >
      <div className={'reference mb-4'}>
        <a href={content["reference-link"]["link"]} target="_blank" rel="noopener noreferrer">
          <h5 className="d-flex align-items-center">
            {content["reference-link"]["anchor"]}
            <OpenInNewIcon />
          </h5>
        </a>

        <div className="text-italic mb-2">
          {content["reference-details"]["text"]}
        </div>

        <p className="">
          {content["reference-description"]["text"]}
        </p>

      </div>
    </Editable>
  );
};

export default Reference;

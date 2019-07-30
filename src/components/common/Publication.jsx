import React from "react";
import PropTypes from "prop-types";

import {
  PlainTextEditor,
  RichTextEditor,
  ImageUploadEditor,
  FileUploadEditor,
  LinkEditor,
  Editable
} from 'react-easy-editables';

import { uploadImage, uploadFile } from "../../firebase/operations"

class PublicationEditor extends React.Component {
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
      <div className={`p-3 ${this.props.classes}`}>
        <div className={`card`}>
          <div className="card-body">
            <div className="card-img-top bg-light">
              <ImageUploadEditor
                content={content["publication-item-image"]}
                handleEditorChange={this.handleEditorChange("publication-item-image")}
                uploadImage={uploadImage}
              />
            </div>
          </div>
          <div className="card-body">
            <div className="card-title mb-4">
              <h4>
                <PlainTextEditor
                  content={content["publication-item-title"]}
                  handleEditorChange={this.handleEditorChange("publication-item-title")}
                />
              </h4>
            </div>
            <div className="post-details text-italic mb-3">
              <PlainTextEditor
                content={content["publication-item-details"]}
                handleEditorChange={this.handleEditorChange("publication-item-details")}
              />
            </div>

            <div className="card-text mb-3">
              <PlainTextEditor
                content={content["publication-item-description"]}
                handleEditorChange={this.handleEditorChange("publication-item-description")}
              />
            </div>

            <div className="card-text mb-3">
              <LinkEditor
                content={content["publication-item-link"]}
                handleEditorChange={this.handleEditorChange("publication-item-link")}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const Publication = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  return (
    <Editable
      Editor={PublicationEditor}
      handleSave={handleSave}
      content={content}
      {...props}
    >
      <div className={`p-3 ${props.classes}`}>
        <a href={content["publication-item-file"]["filepath"]} target="_blank" rel="noopener noreferrer">
          <div className={`card`}>
            <div className="card-img-top bg-light d-flex" style={{ height: "300px" }}>
              <img
                className="img-fluid w-100"
                style={{ objectFit: "cover" }}
                src={content["publication-item-image"]["imageSrc"]}
                alt={content["publication-item-image"]["caption"]}
              />
            </div>
            <div className="card-body">
              <div className="card-title">
                <h4 className="text-primary">
                  { content["publication-item-title"]["text"] }
                </h4>
              </div>

              <div className="post-details text-italic mb-3">
                {content["publication-item-details"]["text"]}
              </div>

              <p className="card-text">
                {content["publication-item-description"]["text"]}
              </p>
            </div>
          </div>
        </a>
      </div>
    </Editable>
  );
};

export default Publication;

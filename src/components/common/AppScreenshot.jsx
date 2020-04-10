import React from "react";
import PropTypes from "prop-types";

import {
  ImageUploadEditor,
  Editable
} from 'react-easy-editables';

import { uploadImage, uploadFile } from "../../firebase/operations"

class AppScreenshotEditor extends React.Component {
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
      <div className={`p-3 screenshot ${this.props.classes}`}>
        <div className={`card`}>
          <div className="card-body">
            <div className="card-img-top bg-light">
              <ImageUploadEditor
                content={content["screenshot-item-image"]}
                onContentChange={this.handleEditorChange("screenshot-item-image")}
                uploadImage={uploadImage}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const AppScreenshot = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  return (
    <Editable
      Editor={AppScreenshotEditor}
      handleSave={handleSave}
      content={content}
      {...props}
    >
      <div className={`${props.classes} screenshot`}>
        <a href={content["screenshot-item-link"]["link"]} target="_blank" rel="noopener noreferrer">
          <div className={`card`}>
            {
              Boolean(content["screenshot-item-image"]["imageSrc"]) &&
              <div className="card-img-top bg-light d-flex">
                <img
                  className="img-fluid w-100"
                  style={{ objectFit: "cover" }}
                  src={content["screenshot-item-image"]["imageSrc"]}
                  alt={content["screenshot-item-image"]["caption"]}
                />
              </div>
            }
          </div>
        </a>
      </div>
    </Editable>
  );
};

AppScreenshot.defaultProps = {
  content: {
    "screenshot-item-image": { "imageSrc": "", "caption": "", "title": "" },
  },
  classes: "",
  onSave: () => { console.log('implement a function to save changes') }
}

export default AppScreenshot;

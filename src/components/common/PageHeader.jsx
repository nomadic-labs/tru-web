import React from "react";
import { EditableText, EditableBackgroundImage } from "react-easy-editables";
import { uploadImage } from "../../firebase/operations";

const defaultHeader = "https://firebasestorage.googleapis.com/v0/b/tru-web.appspot.com/o/images%2Fbg-botanical.png?alt=media&token=cce3440c-c686-41e8-a957-59dbaed77e04"

const PageHeader = ({ onSave, content, title, headerImage, onUpdateTitle, onUpdateHeaderImage }) => {
  return (
    <EditableBackgroundImage
      classes="breadcrumb-area full-screen d-flex align-items-center"
      onSave={ onUpdateHeaderImage }
      uploadImage={ uploadImage }
      content={ headerImage || { imageSrc: defaultHeader} }
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="breadcrumb-text text-center">
              <h1 className="text-glow"><EditableText content={{ text: title }} onSave={ onUpdateTitle } /></h1>
              <span data-animation="fadeInUp" data-delay=".3s">
                <EditableText content={ content["header-subtitle"] } handleSave={ onSave("header-subtitle") } placeholder="Subtitle" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </EditableBackgroundImage>
  );
};


PageHeader.defaultProps = {
  content: {
    "header-subtitle": {
      "text": ""
    }
  },
  headerImage: {
    "imageSrc": defaultHeader
  }
}

export default PageHeader

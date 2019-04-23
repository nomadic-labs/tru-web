import React from "react";
import { EditableText, EditableBackgroundImage } from "react-easy-editables";
import { uploadImage } from "../../firebase/operations";


export default ({ onSave, content, title, onUpdateTitle }) => {
  return (
    <EditableBackgroundImage
      classes="breadcrumb-area pt-260 pb-180"
      onSave={ onSave("page-header-bg") }
      uploadImage={ uploadImage }
      content={ content["page-header-bg"] }
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="breadcrumb-text text-center">
              <h1><EditableText content={{ text: title }} onSave={ onUpdateTitle } /></h1>
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


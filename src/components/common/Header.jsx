import React from "react";
import { EditableText, EditableBackgroundImage } from "react-easy-editables";


export default (props) => {
  return (
    <EditableBackgroundImage classes="breadcrumb-area pt-260 pb-180">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="breadcrumb-text text-center">
              <h1><EditableText content={ props.content } onSave={ props.handleSave } /></h1>
            </div>
          </div>
        </div>
      </div>
    </EditableBackgroundImage>
  );
};


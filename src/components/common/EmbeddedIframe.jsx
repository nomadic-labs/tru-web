import React from "react";
import { EditableEmbeddedIframe } from "react-easy-editables";
import Container from "./Container"


const EmbeddedIframe = props => {
  return (
    <div className={`iframe-container my-4 ${props.classes || ''}`}>
      <EditableEmbeddedIframe { ...props } />
    </div>
  );
};

export default EmbeddedIframe;

import React from "react";
import { EditableEmbeddedIframe } from "react-easy-editables";
import Container from "./Container"


const EmbeddedIframe = props => {
  return (
    <Container>
      <div className="iframe-container">
        <EditableEmbeddedIframe { ...props } />
      </div>
    </Container>
  );
};

export default EmbeddedIframe;

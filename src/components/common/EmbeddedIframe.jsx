import React from "react";
import { EditableEmbeddedIframe } from "react-easy-editables";
import Container from "./Container"


const EmbeddedIframe = props => {
  return (
    <Container lg={11} md={11} sm={11} xs={12}>
      <div className="iframe-container">
        <EditableEmbeddedIframe { ...props } />
      </div>
    </Container>
  );
};

export default EmbeddedIframe;

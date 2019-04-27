import React from "react";
import { EditableEmbeddedIframe } from "react-easy-editables";
import Container from "./Container"


const EmbeddedIframe = props => {
  return (
    <Container xs={props.xs || 10} sm={props.sm || 8} md={props.md || 6} lg={props.lg || 6}>
      <div className={`iframe-container my-4 ${props.classes || ''}`}>
        <EditableEmbeddedIframe { ...props } />
      </div>
    </Container>
  );
};

export default EmbeddedIframe;

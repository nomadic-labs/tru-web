import React from "react";
import { EditableImageUpload } from "react-easy-editables";
import Container from "./Container"


export default (props) => {
  return (
    <Container>
      <EditableImageUpload { ...props } />
    </Container>
  );
};

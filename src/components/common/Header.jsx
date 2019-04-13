import React from "react";
import { EditableText } from "react-easy-editables";
import Container from "./Container"


export default (props) => {
  return (
    <Container>
      <h2 data-animation="fadeInUp" data-delay=".5s">
        <EditableText content={ props.content } onSave={ props.handleSave } />
      </h2>
    </Container>
  );
};

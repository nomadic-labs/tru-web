import React from "react";
import { EditableParagraph } from "react-easy-editables";
import Container from "./Container"


export default (props) => {
  return (
    <Container>
      <EditableParagraph content={ props.content } onSave={ props.handleSave } />
    </Container>
  );
};


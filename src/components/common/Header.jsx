import React from "react";
import { EditableText } from "react-easy-editables";
import Container from "./Container"


export default (props) => {
  return (
    <Container>
      <h2>
        <EditableText { ...props } classes={"my-4"} />
      </h2>
    </Container>
  );
};

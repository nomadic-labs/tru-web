import React from "react";
import { EditableImageUpload } from "react-easy-editables";
import Container from "./Container"

import { uploadImage } from "../../firebase/operations";


export default (props) => {
  return (
    <Container>
      <EditableImageUpload { ...props } uploadImage={uploadImage} showCaption={true} editCaption={true} />
    </Container>
  );
};

import React from "react";
import { EditableImageUpload } from "react-easy-editables";
import Container from "./Container"

import { uploadImage } from "../../firebase/operations";


export default (props) => {
  return (
    <Container>
      <div className={"my-4"}>
        <EditableImageUpload { ...props } uploadImage={uploadImage} showCaption={true} editCaption={true} />
      </div>
    </Container>
  );
};

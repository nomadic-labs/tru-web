import React from "react";
import { EditableImageUpload } from "react-easy-editables";

import { uploadImage } from "../../firebase/operations";


export default (props) => {
  return (
    <div className="shape d-none d-xl-block">
      <div className={`shape-item pro-02 ${props.isEditingPage ? '' : 'bounce-animate'}`}>
        <EditableImageUpload
          { ...props }
          styles={{ container: {width: "15vw"} }}
          uploadImage={uploadImage}
        />
      </div>
    </div>
  );
};

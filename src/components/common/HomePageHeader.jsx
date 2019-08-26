import React from "react";
import { EditableText, EditableBackgroundImage } from "react-easy-editables";
import { uploadImage } from "../../firebase/operations";
import Branch from "../../assets/images/branch_white.svg";

const defaultHeader = "https://firebasestorage.googleapis.com/v0/b/tru-web.appspot.com/o/images%2Fimperial-oil.jpg?alt=media&token=f9072b5c-161a-4bd8-bd61-b3ad3b9c5853";

const PageHeader = ({ onSave, content, title, headerImage, onUpdateTitle, onUpdateHeaderImage }) => {
  return (
    <EditableBackgroundImage
      classes="breadcrumb-area d-flex pt-160 pb-80 align-items-center home-page-header bg-primary"
      onSave={ onUpdateHeaderImage }
      uploadImage={ uploadImage }
      content={ headerImage || { imageSrc: defaultHeader} }
      styles={{ paddingTop: "9%", paddingBottom: "4.5%"}}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="breadcrumb-text text-center pt-40 pb-60" style={{ textShadow: "0px 0px 30px #000000" }}>
              <h1 data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={{ text: title }} onSave={ onUpdateTitle } />
              </h1>
              <span data-animation="fadeInUp" data-delay=".3s">
                <EditableText content={ content["header-subtitle"] } handleSave={ onSave("header-subtitle") } placeholder="Subtitle" />
              </span>
              <div className="pt-20">
                <img src={Branch} style={{ width: "240px", maxWidth: "100vw" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditableBackgroundImage>
  );
};


PageHeader.defaultProps = {
  content: {
    "header-subtitle": {
      "text": ""
    }
  },
  headerImage: {
    "imageSrc": defaultHeader
  }
}

export default PageHeader
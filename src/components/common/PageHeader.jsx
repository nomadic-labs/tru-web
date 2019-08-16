import React from "react";
import { EditableText, EditableBackgroundImage, EditableImageUpload } from "react-easy-editables";
import { uploadImage } from "../../firebase/operations";
import titleBg from "../../assets/images/illustrations/title-bg.png";
import PageTopics from "./PageTopics"

const defaultHeader = "https://firebasestorage.googleapis.com/v0/b/tru-web.appspot.com/o/images%2Fbg-botanical.png?alt=media&token=cce3440c-c686-41e8-a957-59dbaed77e04";
const styles = {
  header: {
    minHeight: "80vh",
  },
  headerText: {
  },
  headerImage: {
    position: "absolute",
    right: 0,
    top: 0,
    opacity: 0.75,
  },
  image: {
    objectFit: 'cover',
    maxHeight: "60vh",
  }
}

const PageHeader = ({ onSave, content, title, headerImage, onUpdateTitle, onUpdateHeaderImage }) => {
  return (
    <div className="breadcrumb-area d-flex pt-60 pb-60 bg-primary" style={ styles.header }>
      <div className="container">
        <div className="row justify-content-start pos-relative">
          <div className="col-md-8" style={ styles.headerText }>
            <div className="breadcrumb-text pt-40 pb-40">
              <h1 data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={{ text: title }} onSave={ onUpdateTitle } />
              </h1>
              <span data-animation="fadeInUp" data-delay=".3s">
                <EditableText content={ content["header-subtitle"] } handleSave={ onSave("header-subtitle") } placeholder="Subtitle" />
              </span>
            </div>
          </div>
          <div className="col-md-8" style={ styles.headerImage }>
            <EditableImageUpload
              onSave={ onUpdateHeaderImage }
              uploadImage={ uploadImage }
              content={ headerImage || { imageSrc: defaultHeader} }
              maxSize={1024 * 1024 * 12}
              styles={{ image: styles.image }}
            />
          </div>
        </div>
      </div>
    </div>
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

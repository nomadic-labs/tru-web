import React from "react";
import { EditableText, EditableBackgroundImage, EditableImageUpload } from "react-easy-editables";
import { uploadImage } from "../../firebase/operations";
import titleBg from "../../assets/images/illustrations/title-bg.png";
import PageTopics from "./PageTopics"
import Container from "./Container"

const defaultHeader = "https://firebasestorage.googleapis.com/v0/b/tru-web.appspot.com/o/images%2Fbg-botanical.png?alt=media&token=cce3440c-c686-41e8-a957-59dbaed77e04";
const styles = {
  image: {
    objectFit: 'cover',
    maxHeight: "60vh",
  }
}

const PageHeader = ({ onSave, content, title, headerImage, onUpdateTitle, onUpdateHeaderImage }) => {
  return (
    <div className="page-header breadcrumb-area d-flex pt-60 pb-60 bg-primary">
      <Container xl={10} lg={10} md={11} sm={11} xs={11}>
        <div className="row justify-content-start pos-relative">
          <div className="col-12 col-lg-6 d-flex align-items-center">
            <div className="breadcrumb-text pt-40 pb-40">
              <h1 data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={{ text: title }} onSave={ onUpdateTitle } />
              </h1>
              <span data-animation="fadeInUp" data-delay=".3s">
                <EditableText content={ content["header-subtitle"] } handleSave={ onSave("header-subtitle") } placeholder="Subtitle" />
              </span>
            </div>
          </div>
          <div className="col-12 col-lg-6 align-items-center d-flex page-header-image">
            <EditableImageUpload
              onSave={ onUpdateHeaderImage }
              uploadImage={ uploadImage }
              content={ headerImage || { imageSrc: defaultHeader} }
              maxSize={1024 * 1024 * 12}
              styles={{ image: styles.image }}
            />
          </div>
        </div>
      </Container>
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

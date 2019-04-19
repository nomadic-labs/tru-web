import React, { Fragment } from "react";
import { connect } from "react-redux";
import { EditableText, EditableParagraph, EditableImageUpload } from "react-easy-editables";
import {
  updatePage,
  savePageContent,
  addSection,
  duplicateSection,
  deleteSection,
  addContentItem,
} from "../../redux/actions";

import Header from "../common/Header";
import Paragraph from "../common/Paragraph";
import Image from "../common/Image";
import EmbeddedIframe from "../common/EmbeddedIframe";
import SectionEditingActions from "./SectionEditingActions"

const componentMap = {
  header: Header,
  paragraph: Paragraph,
  image: Image,
  embeddedIframe: EmbeddedIframe,
}


const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    addSection: (sectionIndex) => {
      dispatch(addSection(sectionIndex));
    },
    deleteSection: (sectionIndex) => {
      dispatch(deleteSection(sectionIndex));
    },
    duplicateSection: (sectionIndex) => {
      dispatch(duplicateSection(sectionIndex));
    },
    addContentItem: (sectionIndex, contentType) => {
      dispatch(addContentItem(sectionIndex, contentType))
    },
    savePageContent: (innerFunction) => {
      dispatch(savePageContent(innerFunction));
    },
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data
  };
};


const DynamicSection = ({ content, sectionIndex, pageData, onUpdatePageData, savePageContent, addSection, deleteSection, duplicateSection, addContentItem }) => {

  const onAddSection = () => {
    savePageContent(() => addSection(sectionIndex))
  }

  const onDeleteSection = () => {
    savePageContent(() => deleteSection(sectionIndex))
  }

  const onDuplicateSection = () => {
    savePageContent(() => duplicateSection(sectionIndex))
  }

  const onAddContentItem = (contentType) => {
    savePageContent(() => addContentItem(sectionIndex, contentType))
  }

  return(
    <div className="dynamic-section pos-relative pt-60 pb-60">
      {
        content.map((component, index ) => {
          const Component = componentMap[component.type];
          return <Component content={component.content} key={index} />;
        })
      }
      <SectionEditingActions
        onDuplicateSection={onDuplicateSection}
        onDeleteSection={onDeleteSection}
        onAddSection={onAddSection}
        onAddContentItem={onAddContentItem}
      />
    </div>
  )
};


export default connect(mapStateToProps, mapDispatchToProps)(DynamicSection);

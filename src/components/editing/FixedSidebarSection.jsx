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
  updateContentItem,
  deleteContentItem,
} from "../../redux/actions";

import Affix from "../common/Affix"
import Header from "../common/Header";
import Paragraph from "../common/Paragraph";
import Image from "../common/Image";
import ImageCarousel from "../common/ImageCarousel";
import EmbeddedIframe from "../common/EmbeddedIframe";
import Timeline from "../common/Timeline";
import BouncingImageTopLeft from "../common/BouncingImageTopLeft";
import BouncingImageTopRight from "../common/BouncingImageTopRight";
import BouncingImageBottomLeft from "../common/BouncingImageBottomLeft";
import BouncingImageBottomRight from "../common/BouncingImageBottomRight";
import SectionEditingActionsLimited from "./SectionEditingActionsLimited"
import SectionEditingActionsFixedSidebar from "./SectionEditingActionsFixedSidebar"

const componentMap = {
  header: Header,
  paragraph: Paragraph,
  image: Image,
  imageCarousel: ImageCarousel,
  embeddedIframe: EmbeddedIframe,
  timeline: Timeline,
  bouncingImageTopLeft: BouncingImageTopLeft,
  bouncingImageTopRight: BouncingImageTopRight,
  bouncingImageBottomLeft: BouncingImageBottomLeft,
  bouncingImageBottomRight: BouncingImageBottomRight,
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    addSection: (sectionIndex, sectionType) => {
      dispatch(addSection(sectionIndex, sectionType));
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
    updateContentItem: (sectionIndex, contentIndex, content) => {
      dispatch(updateContentItem(sectionIndex, contentIndex, content))
    },
    deleteContentItem: (sectionIndex, contentIndex) => {
      dispatch(deleteContentItem(sectionIndex, contentIndex))
    },
    savePageContent: (innerFunction) => {
      dispatch(savePageContent(innerFunction));
    },
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    isEditingPage: state.adminTools.isEditingPage,
  };
};


const FixedSidebarSection = ({ sidebar, content, type, sectionIndex, pageData, isEditingPage, onUpdatePageData, savePageContent, addSection, deleteSection, duplicateSection, addContentItem, updateContentItem, deleteContentItem }) => {

  const onAddSection = () => {
    savePageContent(() => addSection(sectionIndex))
  }

  const onAddContrastSection = () => {
    savePageContent(() => addSection(sectionIndex, "contrast"))
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

  const onUpdateContentItem = (sectionIndex, contentIndex) => content => {
    savePageContent(() => updateContentItem(sectionIndex, contentIndex, content))
  }

  const onDeleteContentItem = (sectionIndex, contentIndex) => () => {
    savePageContent(() => deleteContentItem(sectionIndex, contentIndex))
  }

  return(
    <section className={`fixed-sidebar-section`}>
      <div className={`sidebar`}>
        <Affix>
          <div className="pt-40 pb-40 pr-40 pl-40 sidebar-inner pos-relative d-flex justify-content-center">
            {
              ((sidebar) => {
                if (sidebar) {
                  const Component = componentMap[sidebar.type];
                  return(
                    <Component
                      content={sidebar.content}
                      onSave={() => console.log("save sidebar thing")}
                      onDelete={() => console.log("delete sidebar thing")}
                      isEditingPage={isEditingPage}
                    />
                  )
                }
              })(sidebar)
            }
            {
              (isEditingPage && !sidebar) &&
              <SectionEditingActionsFixedSidebar
                onAddContentItem={onAddContentItem}
              />
            }
          </div>
        </Affix>
      </div>
      <div className={`content pt-40 pb-40 pr-40 pl-40 pos-relative`}>
        {
          content.map((component, index ) => {
            const Component = componentMap[component.type];
            return (
              <Component
                content={component.content}
                onSave={onUpdateContentItem(sectionIndex, index)}
                onDelete={onDeleteContentItem(sectionIndex, index)}
                key={index}
                isEditingPage={isEditingPage}
              />
            )
          })
        }
        {
          isEditingPage &&
          <SectionEditingActionsLimited
            onDuplicateSection={onDuplicateSection}
            onDeleteSection={onDeleteSection}
            onAddSection={onAddSection}
            onAddContentItem={onAddContentItem}
          />
        }
      </div>
    </section>
  )
};


export default connect(mapStateToProps, mapDispatchToProps)(FixedSidebarSection);

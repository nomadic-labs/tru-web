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
  addSidebarContent,
  updateSidebarContent,
  deleteSidebarContent,
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
    savePageContent: (innerFunction) => {
      dispatch(savePageContent(innerFunction));
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
    addSidebarContent: (sectionIndex, contentType) => {
      dispatch(addSidebarContent(sectionIndex, contentType))
    },
    updateSidebarContent: (sectionIndex, content) => {
      dispatch(updateSidebarContent(sectionIndex, content))
    },
    deleteSidebarContent: (sectionIndex) => {
      dispatch(deleteSidebarContent(sectionIndex))
    }
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    isEditingPage: state.adminTools.isEditingPage,
  };
};


const FixedSidebarSection = ({ sidebar, content=[], type, sectionIndex, pageData, isEditingPage, onUpdatePageData, savePageContent, addSection, deleteSection, duplicateSection, addContentItem, updateContentItem, deleteContentItem, addSidebarContent, updateSidebarContent, deleteSidebarContent }) => {

  const onAddSection = () => {
    savePageContent(() => addSection(sectionIndex, "fixed-sidebar-section"))
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

  const onAddSidebarContent = (contentType) => {
    savePageContent(() => addSidebarContent(sectionIndex, contentType))
  }

  const onUpdateSidebarContent = (sectionIndex) => content => {
    savePageContent(() => updateSidebarContent(sectionIndex, content))
  }

  const onDeleteSidebarContent = (sectionIndex) => () => {
    savePageContent(() => deleteSidebarContent(sectionIndex))
  }

  const SidebarComponent = sidebar ? componentMap[sidebar.type] : null;

  return(
    <section className={`fixed-sidebar-section`}>
      <div className={`sidebar`}>
        <Affix disableOnMobile={true} mobileBreakpoint={992}>
          <div className="pt-40 pb-40 pr-40 pl-40 sidebar-inner pos-relative d-flex justify-content-center">
            {
              SidebarComponent &&
              <SidebarComponent
                content={sidebar.content}
                onSave={onUpdateSidebarContent(sectionIndex)}
                onDelete={onDeleteSidebarContent(sectionIndex)}
                isEditingPage={isEditingPage}
              />
            }
            {
              (isEditingPage && !sidebar) &&
              <SectionEditingActionsFixedSidebar
                onAddContentItem={onAddSidebarContent}
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
                key={index}
                content={component.content}
                onSave={onUpdateContentItem(sectionIndex, index)}
                onDelete={onDeleteContentItem(sectionIndex, index)}
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

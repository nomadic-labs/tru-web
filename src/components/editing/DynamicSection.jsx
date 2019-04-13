import React, { Fragment } from "react";
import { connect } from "react-redux";
import { EditableText, EditableParagraph, EditableImageUpload } from "react-easy-editables";
import Header from "../common/Header";
import SectionEditingActions from "./SectionEditingActions"

const componentMap = {
  header: Header,
}


const DynamicSection = ({ content }) => {
  return(
    <div className="dynamic-section pos-relative">
      {
        content.map((component, index ) => {
          const Component = componentMap[component.type];
          return <Component content={component.content} key={index} />;
        })
      }
      <SectionEditingActions onDuplicate={() => console.log("duplicate!")} />
    </div>
  )
};


export default DynamicSection;

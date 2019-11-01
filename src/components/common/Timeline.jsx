import React from "react";
import Container from "./Container"
import { EditableTimeline } from "react-easy-editables"

import "../../assets/sass/timeline.scss"


const Timeline = props => {

  return (
    <Container xs={props.xs || 12} sm={props.sm || 12} md={props.md || 12} lg={props.lg || 12} xl={props.xl || 12}>
      <div>
        <EditableTimeline { ...props } />
      </div>
    </Container>
  );
};

export default Timeline;
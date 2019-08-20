import React from "react";
import Container from "./Container"
import { EditableKnightTimeline } from "react-easy-editables"

import "../../assets/sass/timeline.scss"


const Timeline = props => {

  return (
    <Container xs={props.xs || 12} sm={props.sm || 12} md={props.md || 12} lg={props.lg || 12} xl={props.xl || 12}>
      <div>
        <EditableKnightTimeline { ...props } options={{ initial_zoom: 6 }} />
      </div>
    </Container>
  );
};

export default Timeline;

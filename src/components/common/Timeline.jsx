import React from "react";
import Container from "./Container"
import { EditableTimeline } from "react-easy-editables"
import "@fortawesome/fontawesome-free/css/all.css"

const defaults = {
  icons: [<i className="fas fa-crow" />, <i className="fas fa-fish" />, <i className="fas fa-spider" />, <i className="fas fa-otter" />, <i className="fas fa-frog" />, <i className="fas fa-cat" />],
  colors: ["#2F6165", "#423243", "#B46547", "#29702a", "#3c5c78"]
}

// $dark-blue: #3c5c78;
// $medium-blue: #2F6165;
// $dark-green: #29702a;
// $dark-purple: #423243;
// $rust: #B46547;


const Timeline = props => {
  let timelineProps = { ...props, apiKey: process.env.GATSBY_GOOGLE_API_KEY, config: { ...props.config, defaults } }

  return (
    <Container xs={props.xs || 12} sm={props.sm || 12} md={props.md || 12} lg={props.lg || 12} xl={props.xl || 12}>
      <div>
        <EditableTimeline {...timelineProps} />
      </div>
    </Container>
  );
};

export default Timeline;
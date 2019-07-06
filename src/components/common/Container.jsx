import React from "react";
import Grid from "@material-ui/core/Grid";


export default (props) => {
  return (
    <Grid container justify="center" className={props.className}>
      <Grid item xs={props.xs || 10} sm={props.sm || 8} md={props.md || 6} lg={props.lg || 6}>
        <div data-animation="fadeInUp" data-delay=".5s">
        { props.children }
        </div>
      </Grid>
    </Grid>
  );
};



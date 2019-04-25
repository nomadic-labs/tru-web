import React from "react";
import Grid from "@material-ui/core/Grid";


export default (props) => {
  return (
    <Grid container justify="center" spacing={24}>
      <Grid item xs={props.xs || 10} sm={props.sm || 8} md={props.md || 6} lg={props.lg || 6}>
        { props.children }
      </Grid>
    </Grid>
  );
};



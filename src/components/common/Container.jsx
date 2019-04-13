import React from "react";
import Grid from "@material-ui/core/Grid";


export default (props) => {
  return (
    <Grid container justify="center">
      <Grid item xs={10} sm={8} md={6}>
        { props.children }
      </Grid>
    </Grid>
  );
};



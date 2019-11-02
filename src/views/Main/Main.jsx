import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./Main.style";

class Main extends Component {
  render() {
    const { classes } = this.props;
  
    return (
      <Grid container className={classes.container}>
        Main
      </Grid>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);

import React, { Component } from "react";
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from './Registration.style'; 

class Registration extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.wrapper}>
       Registration
      </Grid>
    );
  }
}

export default withStyles(styles)(Registration);

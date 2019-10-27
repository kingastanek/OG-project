import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./Login.style";

class Login extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.wrapper}>
        Login
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
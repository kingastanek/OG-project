import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import ResourcesBar from 'components/ResourcesBar';
import Menu from 'components/Menu';
import logo from 'assets/images/logo.png';
import commanders from 'assets/images/commanders.png';
import PropTypes from "prop-types";
import styles from "./Main.style";

class Main extends Component {
  render() {
    const { classes } = this.props;
  
    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.resourcesWrapper}>
          <img alt="logo" src={logo} className={classes.logo} />
          <ResourcesBar />
          <img alt="commanders" src={commanders} className={classes.commanders}/>
        </Grid>
        <Grid item xs={2}>
          <Menu />
        </Grid>
        <Grid item xs={8}>
          {/* planets overview */}
        </Grid>
        <Grid item xs={2}>
          {/* planets list */}
        </Grid>
      </Grid>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);

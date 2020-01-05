import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import ResourcesBar from 'components/ResourcesBar';
import Menu from 'components/Menu';
import ActionBar from 'components/ActionBar';
import Planets from 'components/Planets';
import logo from 'assets/images/logo.png';
import welcome from 'assets/images/welcome.jpg';
import commanders from 'assets/images/commanders.png';
import PropTypes from "prop-types";
import styles from "./Main.style";
import strings from "config/strings";

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
        <Grid item xs={2}><Menu /></Grid>
        <Grid item xs={8} className={classes.actionBarContainer}>
          <Grid className={classes.centeredWrapper}><ActionBar /></Grid>
          <Grid className={classes.centeredWrapper}>
            <img src={welcome} alt="welcome" className={classes.welcome} />
            <div className={classes.welcomeTextBlock}>
              <Typography className={classes.welcomeText}>{strings.WELCOME_TEXT}</Typography>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={2}><Planets /></Grid>
      </Grid>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);

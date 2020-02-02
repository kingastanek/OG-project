import React from "react";
import { Grid } from '@material-ui/core';
import ResourcesBar from 'components/ResourcesBar';
import logo from 'assets/images/logo.png';
import commanders from 'assets/images/commanders.png';
import strings from "config/strings";
import { withStyles } from "@material-ui/styles";
import styles from "./TopResourcesPanel.style";

const TopResourcesPanel = (props) => {
    const { classes } = props;
    return (
      <Grid className={classes.resourcesWrapper}>
        <img alt={strings.LOGO} src={logo} className={classes.logo} />
        <ResourcesBar />
        <img
          alt={strings.COMMANDERS}
          src={commanders}
          className={classes.commanders}
        />
      </Grid>
    )
  }

export default withStyles(styles)(TopResourcesPanel);

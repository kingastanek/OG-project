import React from "react";
import { Typography } from '@material-ui/core';
import strings from "config/strings";
import { withStyles } from "@material-ui/styles";
import styles from "./ActionBar.style";

const ActionBar = (props) => {
    const { classes } = props;
    return (
      <div className={classes.actionBar}>
        <div className={classes.actionBarSide} />
        <div className={classes.actionBarCenter}>
        <Typography className={classes.actionBarText}>{strings.NO_FLEET_MOVEMENT}</Typography>
        </div>
        <div className={classes.actionBarSide} />
      </div>
    )
  }

export default withStyles(styles)(ActionBar);

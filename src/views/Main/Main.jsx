import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Menu from "components/Menu";
import ActionBar from "components/ActionBar";
import Planets from "components/Planets";
import TopResourcesPanel from "components/TopResourcesPanel";
import welcome from "assets/images/welcome.jpg";
import styles from "./Main.style";
import strings from "config/strings";

const main = (props) => {
  const { classes } = props;
  return (
    <Grid container className={classes.container}>
      <TopResourcesPanel />
      <Grid item xs={12} className={classes.contentWrapper}>
        <Grid item xs={2}><Menu /></Grid>
        <Grid item xs={8} className={classes.actionBarContainer}>
          <Grid className={classes.centeredWrapper}><ActionBar /></Grid>
          <Grid className={classes.centeredWrapper}>
            <img src={welcome} alt="welcome" className={classes.welcomeImg} />
            <div className={classes.welcomeTextBlock}>
              <Typography className={classes.welcomeText}>
                {strings.WELCOME_TEXT}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={2}><Planets /></Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(main);

import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./BuildingsTabsSection.style";

class BuildingDetailsCard extends Component {
  state = {
    minutes: 0,
    hours: 0,
    seconds: 0,
    startTime: 100,
  };
  render() {
    const {
      classes,
      className,
      onClick,
      notAbleToBuild,
      style,
    } = this.props;
    const {
      minutes,
      hours,
      seconds,
      startTime,
    } = this.state;
    // const style = {
    //   height: `${startTime}%`,
    //   maxHeight: '100%',
    // };
    return (
      <Grid className={classes.buildingsMines}>
      <Paper
        className={className}
        onClick={onClick}
        style={style}
      >
        {notAbleToBuild && (
          <React.Fragment>
            <div className={classes.timeRemaining}>{hours}h {minutes}m {seconds}s</div>
            {/* <div className={classes.timeLayer} style={style} /> */}
            <div className={classes.timeLayer} />
          </React.Fragment>
        )} 
      </Paper>
    </Grid>
    )
  }
}

export default withStyles(styles)(BuildingDetailsCard);

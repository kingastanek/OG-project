import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./ResearchesTabSection.style";

class ResearchesTabSection extends Component {
  render() {
    const {
      classes,
      className,
      onClick,
      notAbleToBuild,
      style,
      timeLayerStyle,
      minutes,
      hours,
      seconds,
    } = this.props;
    return (
      <Grid className={classes.researches}>
      <Paper
        className={className}
        onClick={onClick}
        style={style}
      >
        {notAbleToBuild && (
          <React.Fragment>
            <div className={classes.timeRemaining}>{hours}h {minutes}m {seconds}s</div>
            <div className={classes.timeLayer} style={timeLayerStyle} />
          </React.Fragment>
        )} 
      </Paper>
    </Grid>
    )
  }
}

export default withStyles(styles)(ResearchesTabSection);

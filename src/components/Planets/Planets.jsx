import React from "react";
import { Grid, Typography } from "@material-ui/core";
import strings from "config/strings";
import homeworld from "assets/images/homeworld.png";
import { withStyles } from "@material-ui/styles";
import styles from "./Planets.style";
import { Component } from "react";

class Planets extends Component {
  state = {
    hover: false,
  }

  hoverOn = () => this.setState({ hover: true });

  hoverOff = () => this.setState({ hover: false });

  render() {
    const { classes } = this.props;
    const { hover } = this.state;
    const hoverClass = hover ? classes.planetHover : '';
    const hoverTextClass = hover ? classes.planetHoverText : '';
    return (
      <Grid>
        <div className={classes.planetsBar}>
          <Typography className={classes.planetsText}>1/1 Planets</Typography>
        </div>
        <Grid
          className={classes.planetWrapper}
          onMouseEnter={this.hoverOn}
          onMouseLeave={this.hoverOff}
        >
          <div className={classes.homeworldWrapper}>
            <img
              src={homeworld}
              alt={strings.HOMEWORLD}
              className={[classes.homeworldImg, hoverClass].join(' ')}
            />
          </div>
          <Typography className={[classes.homeworldText, hoverTextClass].join(' ')}>
            {strings.HOMEWORLD}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Planets);

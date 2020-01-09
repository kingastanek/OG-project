import React, { Component } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import ResourcesBar from 'components/ResourcesBar';
import Menu from 'components/Menu';
import ActionBar from 'components/ActionBar';
import Planets from 'components/Planets';
import BuildingDetailsCard from 'components/BuildingsDetailsCard';
import logo from 'assets/images/logo.png';
import buildingsBackground from 'assets/images/buildings.jpg';
import commanders from 'assets/images/commanders.png';
import PropTypes from "prop-types";
import styles from "./Buildings.style";
import strings from "config/strings";

class Buildings extends Component {
  state = {
    active: false
  }

  toggleBuildingModal = () => {
    const { active } = this.state;
    this.setState({ active: !active })
  }
  

  render() {
    const { classes } = this.props;
    const { active } = this.state;
    const buildingDetailsActive = active ? classes.buildingImgClicked : '';

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.resourcesWrapper}>
          <img alt={strings.LOGO} src={logo} className={classes.logo} />
          <ResourcesBar />
          <img
            alt={strings.COMMANDERS}
            src={commanders}
            className={classes.commanders}
          />
        </Grid>
        <Grid item xs={2}><Menu /></Grid>
        <Grid item xs={8} className={classes.mainContentContainer}>
          <Grid className={classes.centeredWrapper}><ActionBar /></Grid>
          <Grid className={classes.centeredWrapper}>
            <img
              src={buildingsBackground}
              alt={strings.BUILDINGS}
              className={classes.buildingsBigImg}
            />
            <Typography className={classes.overlayText}>{strings.BUILDINGS}</Typography>
          </Grid>
         <BuildingDetailsCard active={active} />
          <Grid className={classes.buildingsMines}>
            <Paper
              className={[classes.metalMineTab, buildingDetailsActive].join(' ')}
              onClick={this.toggleBuildingModal}
            />
          </Grid>
        </Grid>
        <Grid item xs={2}><Planets /></Grid> 
      </Grid>
    );
  }
}

Buildings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Buildings);

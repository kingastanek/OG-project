import React, { Component } from "react";
import { connect } from 'react-redux';
import { Grid, Typography, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import strings from "config/strings";
import ResourcesBar from 'components/ResourcesBar';
import Menu from 'components/Menu';
import ActionBar from 'components/ActionBar';
import Planets from 'components/Planets';
import BuildingDetailsCard from 'components/BuildingsDetailsCard';
import logo from 'assets/images/logo.png';
import buildingsBackground from 'assets/images/buildingsMainImage.jpg';
import commanders from 'assets/images/commanders.png';
import { getBuildings } from 'store/actions/buildings';
import styles from "./Buildings.style";

class Buildings extends Component {
  state = {
    active: false,
    startTime: 100,
    secondsRemaining: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  async componentDidMount() {
    const { getUserBuildings } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserBuildings(userId);
    this.getBuildTime();
    const { secondsRemaining } = this.state;
    this.timerInterval = setInterval(() => {
      this.setState(prevState => ({ startTime: prevState.startTime - 1}))
     }, secondsRemaining * 10);
  }

  componentWillUnmount(){
    clearInterval(this.timerInterval);
  }

  toggleBuildingModal = () => {
    const { active } = this.state;
    this.setState({ active: !active })
  }

  getBuildTime = () => {
    const { buildings: { metal: { buildTime } } } = this.props;
    const hours = new Date(`December 1, ${buildTime}`).getHours();
    this.setState({ hours });
    const minutes = new Date(`December 1, ${buildTime}`).getMinutes();
    this.setState({ minutes });
    const seconds = new Date(`December 1, ${buildTime}`).getSeconds();
    this.setState({ seconds });
    this.setState({ secondsRemaining: (hours * 3600) + (minutes * 60) + seconds });
  }

  render() {
    const { classes, buildings: { metal: { isAbleToBuild } } } = this.props;
    const {
      active,
      startTime,
      secondsRemaining,
      hours,
      minutes,
      seconds,
    } = this.state;
    const buildingDetailsActive = active ? classes.buildingImgClicked : '';
    const style = {
      height: `${startTime}%`,
      maxHeight: '100%',
    };
    const timeRemaining = `${hours}h ${minutes}m ${seconds}s`;
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
            >
              {(secondsRemaining > 0 && isAbleToBuild === 2) && (
                <div className={classes.timeLayer} style={style}>
                  <div className={classes.timeRemaining}>{timeRemaining}</div>
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={2}><Planets /></Grid> 
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  buildings: state.reducer.buildings,
});

const mapDispatchToProps = dispatch => ({
  getUserBuildings: userId => dispatch(getBuildings(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Buildings));

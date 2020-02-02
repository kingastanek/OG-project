import React, { Component } from "react";
import { connect } from 'react-redux';
import { Grid, Typography, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import strings from "config/strings";
import Menu from 'components/Menu';
import ActionBar from 'components/ActionBar';
import Planets from 'components/Planets';
import BuildingDetailsCard from 'components/BuildingsDetailsCard';
import TopResourcesPanel from 'components/TopResourcesPanel';
import buildingsBackground from 'assets/images/buildingsMainImage.jpg';
import { getBuildings } from 'store/actions/buildings';
import styles from "./Buildings.style";

class Buildings extends Component {
  state = {
    active: false,
    startTime: 100,
    hours: 0,
    minutes: 0,
    seconds: 0,
    secondsRemaining: 0,
  }

  async componentDidMount() {
    const { getUserBuildings } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserBuildings(userId);
    this.getBuildTime();
    // change to real stable values of buildTime
    const h = 0;
    const m = 10;
    const s = 20;
    this.setState({ secondsRemaining: (h * 3600) + (m * 60) + s });
    const { secondsRemaining } = this.state;
    this.xx = setInterval(() => this.getBuildTime(), 1000)
    this.timerInterval = setInterval(() => {
      this.setState(prevState => ({ startTime: prevState.startTime - 1}))
    }, secondsRemaining * 10);
  
  }

  componentWillUnmount(){
    clearInterval(this.timerInterval);
    clearInterval(this.xx);
  }

  toggleBuildingModal = () => {
    const { active } = this.state;
    this.setState({ active: !active })
  }

  getBuildTime = async () => {
    const { buildings: { metal: { buildTime } } } = this.props;
    const timeParts = buildTime.split(':');
    const { getUserBuildings } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserBuildings(userId);
    const [hours, minutes, seconds] = timeParts;
    this.setState({ hours, minutes, seconds });
  }

  render() {
    const { classes, buildings: { metal: { isAbleToBuild } } } = this.props;
    const {
      active,
      startTime,
      hours,
      minutes,
      seconds,
    } = this.state;
    const buildingDetailsActive = active ? classes.buildingImgClicked : '';
    const style = {
      height: `${startTime}%`,
      maxHeight: '100%',
    };
    const notAbleToBuild = isAbleToBuild === 2;
    return (
      <Grid container className={classes.container}>
        <TopResourcesPanel />
        <Grid item xs={12} className={classes.contentWrapper}>
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
          <BuildingDetailsCard active={active} disabled={notAbleToBuild} />
            <Grid className={classes.buildingsMines}>
              <Paper
                className={[classes.metalMineTab, buildingDetailsActive].join(' ')}
                onClick={this.toggleBuildingModal}
              >
                {notAbleToBuild && (
                  <React.Fragment>
                    <div className={classes.timeRemaining}>{hours}h {minutes}m {seconds}s</div>
                    <div className={classes.timeLayer} style={style} />
                  </React.Fragment>
                )}
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={2}><Planets /></Grid> 
        </Grid>
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

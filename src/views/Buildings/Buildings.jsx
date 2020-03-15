import React, { Component } from "react";
import { connect } from 'react-redux';
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import strings from "config/strings";
import Menu from 'components/Menu';
import ActionBar from 'components/ActionBar';
import Planets from 'components/Planets';
import BuildingsTabSection from 'components/BuildingsTabSection';
import BuildingDetailsCard from 'components/BuildingsDetailsCard';
import TopResourcesPanel from 'components/TopResourcesPanel';
import buildingsBackground from 'assets/images/buildingsMainImage.jpg';
import { getBuildingsData } from 'config/BuildingsData'
import { getBuildings } from 'store/actions/buildings';
import styles from "./Buildings.style";

class Buildings extends Component {
  state = {
    activeBuildingId: '',
    buildingsData: [],
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
    this.getBuildingsData();
    this.getBuildTime();
    const { hours, minutes, seconds } = this.state;
    this.setState({ secondsRemaining: (hours * 3600) + (minutes * 60) + seconds });
    const { secondsRemaining } = this.state;
    this.buildTimeTimer = setInterval(() => this.getBuildTime(), 1000)
    this.timerInterval = setInterval(() => {
      this.setState(prevState => ({ startTime: prevState.startTime - 1}))
    }, secondsRemaining * 10);
    }

  componentWillUnmount(){
    clearInterval(this.timerInterval);
    clearInterval(this.buildTimeTimer);
  }

  getActiveElement = () => {
    const { buildings } = this.props;
    const { activeBuildingId } = this.state;
    const { buildings: buildingsData } = buildings;
    return buildingsData.find(building => building.buildingId === activeBuildingId);
  }

  getBuildTime = async () => {
    const { buildings: { metal: { buildTime } } } = this.props;
    const timeParts = buildTime && buildTime.split(':');
    const { getUserBuildings } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserBuildings(userId);
    const [hours, minutes, seconds] = timeParts;
    this.setState({ hours, minutes, seconds });
  }

  renderBuildingsTabs = () => {
    const { classes } = this.props;
    const { startTime, hours, minutes, seconds } = this.state;
    const buildingsData = this.getBuildingsData();
    const timeLayerStyle = {
      height: `${startTime}%`,
      maxHeight: '100%',
    };
    return buildingsData && buildingsData.map(building => {
      const {
        style,
        buildingId,
        active,
      } = building;
      const classNames = active
        ? [classes.mineTab, classes.buildingImgClicked].join(' ')
        : classes.mineTab;
      return (
        <BuildingsTabSection
          className={classNames}
          onClick={() => this.onClick(buildingId)}
          style={style}
          key={buildingId}
          timeLayerStyle={timeLayerStyle}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
    )})
  }

  getBuildingsData = () => {
    const { buildings } = this.props;
    const { activeBuildingId } = this.state;
    const data = getBuildingsData(buildings, activeBuildingId);
    const { buildingsData } = this.state;
    const dataToMap = (buildingsData.length && buildingsData) || data; 
    const updatedData = dataToMap.map(item => {
      return {
        ...item,
        active: item.buildingId === activeBuildingId,
      }
    });
    return updatedData;
  }

  onClick = async (id) => {
    const { activeBuildingId } = this.state;
    if (activeBuildingId === id) return this.clearBuildingsDataState();
    await this.setState({ activeBuildingId: id });
    const updatedData = this.getBuildingsData();
    this.setState({ buildingsData: updatedData });
  };

  clearBuildingsDataState = () => {
    this.setState({ activeBuildingId: '' });
    const updatedData = this.getBuildingsData();
    this.setState({ buildingsData: updatedData });
  }

  checkNotAbleToBuild = () => {
    const activeElement = this.getActiveElement();
    return activeElement && activeElement.isAbleToBuild !== 1;
  }

  render() {
    const { classes } = this.props;
    const { activeBuildingId } = this.state;
    const buildingElement = this.getBuildingsData();
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
          <BuildingDetailsCard
            activeBuildingId={activeBuildingId}
            buildingElement={buildingElement}
            disabled={this.checkNotAbleToBuild()}
          />
          <Grid className={classes.buildingTabsWrapper}>{this.renderBuildingsTabs()}</Grid>
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

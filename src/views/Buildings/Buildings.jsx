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
    metalActive: false,
    cristalActive: false,
    deuteriumActive: false,
    startTime: 100,
    hours: 0,
    minutes: 0,
    seconds: 0,
    secondsRemaining: 0,
    notAbleToBuild: false,
  }

  async componentDidMount() {
    const notAbleToBuild = this.checkNotAbleToBuild();
    this.setState({ notAbleToBuild });
    const { getUserBuildings } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserBuildings(userId);
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

  getBuildTime = async () => {
    const { buildings: { metal: { buildTime } } } = this.props;
    const timeParts = buildTime.split(':');
    const { getUserBuildings } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserBuildings(userId);
    const [hours, minutes, seconds] = timeParts;
    this.setState({ hours, minutes, seconds });
  }

  toggleMetalActive = () => {
    const { metalActive } = this.state;
    this.setState({
      metalActive: !metalActive,
      cristalActive: false,
      deuteriumActive: false,
    })
  }
  
  toggleCristalActive = () => {
    const { cristalActive } = this.state;
    this.setState({
      metalActive: false,
      cristalActive: !cristalActive,
      deuteriumActive: false,
    })
  }
  
  toggleDeuteriumActive = () => {
    const { deuteriumActive } = this.state;
    this.setState({
      metalActive: false,
      cristalActive: false,
      deuteriumActive: !deuteriumActive,
    })
  }

  getBuildingsTabsData = () => {
    const {
      classes,
      buildings,
    } = this.props;
    const {
      metalActive,
      cristalActive,
      deuteriumActive,
    } = this.state;
    const buildingsTabsState = {
      metalActive,
      cristalActive,
      deuteriumActive,
    };
    const buildingsTabsProps = {
      classes,
      buildings,
    };
    const buildingsTabsClick = {
      toggleMetalActive:  this.toggleMetalActive,
      toggleCristalActive: this.toggleCristalActive,
      toggleDeuteriumActive: this.toggleDeuteriumActive,
    }
    const buildingsData = getBuildingsData(
      buildingsTabsState,
      buildingsTabsProps,
      buildingsTabsClick,
    );
    return buildingsData;
  }

  renderBuildingsTabs = () => {
    const { classes } = this.props;
    const { startTime, hours, minutes, seconds } = this.state;
    const buildingsData = this.getBuildingsTabsData();
    const timeLayerStyle = {
      height: `${startTime}%`,
      maxHeight: '100%',
    };

    return buildingsData.map(building => {
      const {
        onClick, 
        style,
        id,
        buildingDetailsActive,
      } = building;
      return (
        <BuildingsTabSection
          className={[classes.mineTab, buildingDetailsActive].join(' ')}
          onClick={onClick}
          style={style}
          key={id}
          timeLayerStyle={timeLayerStyle}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
    )})
  }

  checkNotAbleToBuild = () => {
    const {
      metalActive,
      cristalActive,
      deuteriumActive,
    } = this.state;
    const {
      buildings: {
        metal: { isAbleToBuild: metalIsAbleToBuild },
        cristal: { isAbleToBuild: cristalIsAbleToBuild },
        deuterium:{ isAbleToBuild: deuteriumIsAbleToBuild }
      }
    } = this.props;
    if (metalActive) return metalIsAbleToBuild;
    if (cristalActive) return cristalIsAbleToBuild;
    if (deuteriumActive) return deuteriumIsAbleToBuild;
  }

  render() {
    const { classes } = this.props;
    const {
      metalActive,
      cristalActive,
      deuteriumActive,
      notAbleToBuild,
    } = this.state;
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
            metalActive={metalActive}
            cristalActive={cristalActive}
            deuteriumActive={deuteriumActive}
            disabled={notAbleToBuild}
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

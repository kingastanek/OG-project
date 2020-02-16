import React, { Component } from "react";
import { connect } from 'react-redux';
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import strings from "config/strings";
import Menu from 'components/Menu';
import ActionBar from 'components/ActionBar';
import Planets from 'components/Planets';
import BuildingsTabsSection from 'components/BuildingsTabsSection';
import BuildingDetailsCard from 'components/BuildingsDetailsCard';
import TopResourcesPanel from 'components/TopResourcesPanel';
import buildingsBackground from 'assets/images/buildingsMainImage.jpg';
import buildingsImg from 'assets/images/buildings.png';
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

  getBuildTime = async () => {
    const { buildings: { metal: { buildTime } } } = this.props;
    const timeParts = buildTime.split(':');
    const { getUserBuildings } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserBuildings(userId);
    const [hours, minutes, seconds] = timeParts;
    this.setState({ hours, minutes, seconds });
  }

  renderBuildingsTabs = () => {
    const { classes, buildings: { metal, cristal, deuterium} } = this.props;
    const { metalActive, cristalActive, deuteriumActive } = this.state;
    const metalData = {
      ...metal,
      onClick: this.toggleMetalActive,
      buildingDetailsActive: metalActive ? classes.buildingImgClicked : '',
      style: {
        backgroundImage: `url(${buildingsImg})`,
        backgroundPosition: '0px 0px',
      }
    }

    const cristalData = {
      ...cristal,
      onClick: this.toggleCristalActive,
      buildingDetailsActive: cristalActive ? classes.buildingImgClicked : '',
      style: {
        backgroundImage: `url(${buildingsImg})`,
        backgroundPosition: '-100px 0',
      }
    }

    const deuteriumData = {
      ...deuterium,
      onClick: this.toggleDeuteriumActive,
      buildingDetailsActive: deuteriumActive ? classes.buildingImgClicked : '',
      style: {
        backgroundImage: `url(${buildingsImg})`,
        backgroundPosition: '-200px 0',
      }
    }
    const buildingsData = [
      metalData,
      cristalData,
      deuteriumData,
    ];

    return buildingsData.map(building => {
      const {
        onClick, 
        style,
        isAbleToBuild,
        id,
        buildingDetailsActive,
      } = building;
      return (
        <BuildingsTabsSection
          className={[classes.mineTab, buildingDetailsActive].join(' ')}
          onClick={onClick}
          notAbleToBuild={isAbleToBuild}
          style={style}
          key={id}
        />
    )})
  }

  render() {
    const { classes } = this.props;
    const { metalActive } = this.state;
    // const notAbleToBuild = isAbleToBuild === 2;
    const notAbleToBuild = false;
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
          <BuildingDetailsCard active={metalActive} disabled={notAbleToBuild} />
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

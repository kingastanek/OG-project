import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import strings from "config/strings";
import Menu from "components/Menu";
import ActionBar from "components/ActionBar";
import Planets from "components/Planets";
import ResearchTabsSection from "components/ResearchTabsSection";
import ResearchDetailsCard from "components/ResearchDetailsCard";
import TopResourcesPanel from "components/TopResourcesPanel";
import researchesBackground from "assets/images/researchesMainImage.jpg";
import { getResearchesData } from "config/ResearchesData";
import { getResearches } from "store/actions/researches";
import styles from "./Researches.style";

class Researches extends Component {
  state = {
    energyTechnology: false,
    laserTechnology: false,
    ionTechnology: false,
    hyperspaceTechnology: false,
    plasmaTechnology: false,
    combustionDrive: false,
    impulseDrive: false,
    hyperspaceDrive: false,
    espionageTechnology: false,
    computerTechnology: false,
    astrophysics: false,
    intergalacticResearchNetwork: false,
    gravitonTechnology: false,
    weaponsTechnology: false,
    shieldingTechnology: false,
    armorTechnology: false,
    startTime: 100,
    hours: 0,
    minutes: 0,
    seconds: 0,
    secondsRemaining: 0,
    notAbleToBuild: false
  };

  async componentDidMount() {
    // const notAbleToBuild = this.checkNotAbleToBuild();
    // this.setState({ notAbleToBuild });
    // const { getUserBuildings } = this.props;
    // const userId = localStorage.getItem("userId");
    // await getUserBuildings(userId);
    // this.getBuildTime();
    // const { hours, minutes, seconds } = this.state;
    // this.setState({ secondsRemaining: hours * 3600 + minutes * 60 + seconds });
    // const { secondsRemaining } = this.state;
    // this.buildTimeTimer = setInterval(() => this.getBuildTime(), 1000);
    // this.timerInterval = setInterval(() => {
    //   this.setState(prevState => ({ startTime: prevState.startTime - 1 }));
    // }, secondsRemaining * 10);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
    clearInterval(this.buildTimeTimer);
  }

  // getBuildTime = async () => {
  //   const {
  //     buildings: {
  //       metal: { buildTime }
  //     }
  //   } = this.props;
  //   const timeParts = buildTime.split(":");
  //   const { getUserBuildings } = this.props;
  //   const userId = localStorage.getItem("userId");
  //   await getUserBuildings(userId);
  //   const [hours, minutes, seconds] = timeParts;
  //   this.setState({ hours, minutes, seconds });
  // };

  toggleEnergyTechnology = () => {
    const { energyTechnology } = this.state;
    this.setState({
      energyTechnology: !energyTechnology,
      laserTechnology: false,
      ionTechnology: false,
      hyperspaceTechnology: false,
      plasmaTechnology: false,
      combustionDrive: false,
      impulseDrive: false,
      hyperspaceDrive: false,
      espionageTechnology: false,
      computerTechnology: false,
      astrophysics: false,
      intergalacticResearchNetwork: false,
      gravitonTechnology: false,
      weaponsTechnology: false,
      shieldingTechnology: false,
      armorTechnology: false,
    });
  };

  toggleCristalActive = () => {
    const { cristalActive } = this.state;
    this.setState({
      metalActive: false,
      cristalActive: !cristalActive,
      deuteriumActive: false
    });
  };

  toggleDeuteriumActive = () => {
    const { deuteriumActive } = this.state;
    this.setState({
      metalActive: false,
      cristalActive: false,
      deuteriumActive: !deuteriumActive
    });
  };

  getResearchesTabsData = () => {
    const { classes, researches } = this.props;
    const { metalActive, cristalActive, deuteriumActive } = this.state;
    const researchesTabsState = {
      metalActive,
      cristalActive,
      deuteriumActive
    };
    console.log('researches', researches);
    const researchesTabsProps = {
      classes,
      // researches
    };
    const researchesTabsClick = {
      toggleMetalActive: this.toggleMetalActive,
      toggleCristalActive: this.toggleCristalActive,
      toggleDeuteriumActive: this.toggleDeuteriumActive
    };
    const researchesData = getResearchesData(
      researchesTabsState,
      researchesTabsProps,
      researchesTabsClick
    );
    return researchesData;
  };

  renderResearchesTabs = () => {
    const { classes } = this.props;
    const { startTime, hours, minutes, seconds } = this.state;
    const researchesData = this.getResearchesTabsData();
    const timeLayerStyle = {
      height: `${startTime}%`,
      maxHeight: "100%"
    };

    return researchesData.map(research => {
      const { onClick, style, id, buildingDetailsActive } = research;
      return (
        <ResearchTabsSection
          className={[classes.mineTab, buildingDetailsActive].join(" ")}
          onClick={onClick}
          style={style}
          key={id}
          timeLayerStyle={timeLayerStyle}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      );
    });
  };

  // checkNotAbleToBuild = () => {
  //   const { metalActive, cristalActive, deuteriumActive } = this.state;
  //   const {
  //     buildings: {
  //       metal: { isAbleToBuild: metalIsAbleToBuild },
  //       cristal: { isAbleToBuild: cristalIsAbleToBuild },
  //       deuterium: { isAbleToBuild: deuteriumIsAbleToBuild }
  //     }
  //   } = this.props;
  //   if (metalActive) return metalIsAbleToBuild;
  //   if (cristalActive) return cristalIsAbleToBuild;
  //   if (deuteriumActive) return deuteriumIsAbleToBuild;
  // };

  render() {
    const { classes, researches } = this.props;
    const {
      metalActive,
      cristalActive,
      deuteriumActive,
      notAbleToBuild
    } = this.state;
    // const {

    // } = researches;
    console.log('researches', researches);
    return (
      <Grid container className={classes.container}>
        <TopResourcesPanel />
        <Grid item xs={12} className={classes.contentWrapper}>
          <Grid item xs={2}>
            <Menu />
          </Grid>
          <Grid item xs={8} className={classes.mainContentContainer}>
            <Grid className={classes.centeredWrapper}>
              <ActionBar />
            </Grid>
            <Grid className={classes.centeredWrapper}>
              <img
                src={researchesBackground}
                alt={strings.RESEARCHES}
                className={classes.buildingsBigImg}
              />
              <Typography className={classes.overlayText}>
                {strings.RESEARCHES}
              </Typography>
            </Grid>
            <ResearchDetailsCard
              metalActive={metalActive}
              cristalActive={cristalActive}
              deuteriumActive={deuteriumActive}
              disabled={notAbleToBuild}
            />
            <Grid className={classes.buildingTabsWrapper}>
              {this.renderResearchesTabs()}
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Planets />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  researches: state.reducer.researches.allResearchesData[0]
});

const mapDispatchToProps = dispatch => ({
  getUserResearches: userId => dispatch(getResearches(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Researches));

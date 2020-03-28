import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import strings from "config/strings";
import Menu from "components/Menu";
import ActionBar from "components/ActionBar";
import Planets from "components/Planets";
import ResearchesTabSection from "components/ResearchesTabSection";
import ResearchDetailsCard from "components/ResearchDetailsCard";
import TopResourcesPanel from "components/TopResourcesPanel";
import researchesBackground from "assets/images/researchesMainImage.jpg";
import { getResearchesData } from "config/ResearchesData";
import { getResearches } from "store/actions/researches";
import styles from "./Researches.style";

class Researches extends Component {
  state = {
    activeResearchId: '',
    researchesData: [],
    startTime: 100,
    hours: 0,
    minutes: 0,
    seconds: 0,
    secondsRemaining: 0,
  }

  async componentDidMount() {
    const { getUserResearches } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserResearches(userId);
    const { researches } = this.props;
    console.log('researches', researches);
    // this.getResearchesData();
    // this.getBuildTime();
    // const { hours, minutes, seconds } = this.state;
    // this.setState({ secondsRemaining: (hours * 3600) + (minutes * 60) + seconds });
    // const { secondsRemaining } = this.state;
    // this.buildTimeTimer = setInterval(() => this.getBuildTime(), 1000)
    // this.timerInterval = setInterval(() => {
    //   this.setState(prevState => ({ startTime: prevState.startTime - 1}))
    // }, secondsRemaining * 10);
  }

  componentWillUnmount(){
    clearInterval(this.timerInterval);
    clearInterval(this.buildTimeTimer);
  }

  getActiveElement = () => {
    const { researches } = this.props;
    const { activeResearchId } = this.state;
    const { researches: researchesData } = researches;
    return researchesData.find(research => research.techId === activeResearchId);
  }

  getBuildTime = async () => {
    const { researches: { energyTechnology: { buildTime } } } = this.props;
    const timeParts = buildTime && buildTime.split(':');
    const { getUserResearches } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserResearches(userId);
    const [hours, minutes, seconds] = timeParts;
    this.setState({ hours, minutes, seconds });
  }

  renderResearchesTabs = () => {
    const { classes } = this.props;
    const { startTime, hours, minutes, seconds } = this.state;
    const researchesData = this.getResearchesData();
    const timeLayerStyle = {
      height: `${startTime}%`,
      maxHeight: '100%',
    };
    return researchesData && researchesData.map((research, index) => {
      const {
        style,
        techId,
        active,
      } = research
      const classNames = active
        ? [classes.technologyTab, classes.researchImgClicked].join(' ')
        : classes.technologyTab;
      return (
        <ResearchesTabSection
          key={techId || index}
          className={classNames}
          onClick={() => this.onClick(techId)}
          style={style}
          timeLayerStyle={timeLayerStyle}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      )
    })
  }

  getResearchesData = () => {
    const { researches } = this.props;
    const { activeResearchId } = this.state;
    const data = getResearchesData(researches, activeResearchId);
    const { researchesData } = this.state;
    const dataToMap = (researchesData.length && researchesData) || data; 
    const updatedData = dataToMap.map(item => {
      return {
        ...item,
        active: item.techId === activeResearchId,
      }
    });
    return updatedData;
  }

  onClick = async (id) => {
    const { activeResearchId } = this.state;
    if (activeResearchId === id) return this.clearResearchessDataState();
    await this.setState({ activeResearchId: id });
    const updatedData = this.getResearchesData();
    this.setState({ researchesData: updatedData });
  };

  clearResearchessDataState = () => {
    this.setState({ activeResearchId: '' });
    const updatedData = this.getResearchesData();
    this.setState({ researchesData: updatedData });
  }

  checkNotAbleToBuild = () => {
    const activeElement = this.getActiveElement();
    return activeElement && activeElement.isAbleToBuild !== 1;
  }


  render() {
    const { classes } = this.props;
    const { activeResearchId } = this.state;
    const researchesElements = this.getResearchesData();
    return (
      <Grid container className={classes.container}>
        <TopResourcesPanel />
        <Grid item xs={12} className={classes.contentWrapper}>
          <Grid item xs={2}><Menu /></Grid>
          <Grid item xs={8} className={classes.mainContentContainer}>
            <Grid className={classes.centeredWrapper}><ActionBar /></Grid>
            <Grid className={classes.centeredWrapper}>
              <img
                src={researchesBackground}
                alt={strings.RESEARCHES}
                className={classes.researchesBigImg}
              />
              <Typography className={classes.overlayText}>{strings.RESEARCHES}</Typography>
            </Grid>
            <ResearchDetailsCard
              activeResearchId={activeResearchId}
              researchesElements={researchesElements}
              disabled={this.checkNotAbleToBuild()}
            />
            <Grid className={classes.researchesTabsWrapper}>
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
  researches: state.reducer.researches
});

const mapDispatchToProps = dispatch => ({
  getUserResearches: userId => dispatch(getResearches(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Researches));

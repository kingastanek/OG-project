import React, { Component } from "react";
import { connect } from 'react-redux';
import { Grid, Typography, Paper } from "@material-ui/core";
import strings from "config/strings";
import Menu from 'components/Menu';
import ActionBar from 'components/ActionBar';
import Planets from 'components/Planets';
import ResearchDetailsCard from 'components/ResearchDetailsCard';
import TopResourcesPanel from "components/TopResourcesPanel";
import researchBackground from 'assets/images/researchMainImage.jpg';
import { getResearches } from 'store/actions/researches';
import { withStyles } from "@material-ui/styles";
import styles from "./Research.style";

class Research extends Component {
  state = {
    active: false,
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
    this.getBuildTime();
    // change to real stable values of buildTime
    const h = 0;
    const m = 10;
    const s = 20;
    this.setState({ secondsRemaining: (h * 3600) + (m * 60) + s });
    const { secondsRemaining } = this.state;
    this.buildTimeTimer = setInterval(() => this.getBuildTime(), 1000)
    this.startTimeTimer = setInterval(() => {
      this.setState(prevState => ({ startTime: prevState.startTime - 1}))
    }, secondsRemaining * 10);
  
  }

  componentWillUnmount(){
    clearInterval(this.startTimeTimer);
    clearInterval(this.buildTimeTimer);
  }

  toggleResearchModal = () => {
    const { active } = this.state;
    this.setState({ active: !active })
  }

  getBuildTime = async () => {
    const { energyTechnology: { buildTime } } = this.props;
    const timeParts = buildTime.split(':');
    const { getUserResearches } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserResearches(userId);
    const [hours, minutes, seconds] = timeParts;
    this.setState({ hours, minutes, seconds });
  }

  render() {
    const { classes, energyTechnology: { isAbleToBuild } } = this.props;
    const {
      active,
      startTime,
      hours,
      minutes,
      seconds,
    } = this.state;
    const researchDetailsActive = active ? classes.researchImgClicked : '';
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
              src={researchBackground}
              alt={strings.RESEARCH}
              className={classes.researchesBigImg}
            />
            <Typography className={classes.overlayText}>{strings.RESEARCH}</Typography>
          </Grid>
         <ResearchDetailsCard active={active} disabled={notAbleToBuild} />
         <Grid className={classes.researchTechnologyWrapper}>
            <Paper
              className={[classes.energyTechnology, researchDetailsActive].join(' ')}
              onClick={this.toggleResearchModal}
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
  energyTechnology: state.reducer.researches.energyTechnology,
});

const mapDispatchToProps = dispatch => ({
  getUserResearches: userId => dispatch(getResearches(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Research));


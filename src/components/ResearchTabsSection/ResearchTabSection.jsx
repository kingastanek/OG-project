import React, { Component } from "react";
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/styles";
import { Grid, Paper } from "@material-ui/core";
import { getResearches } from 'store/actions/researches';
import styles from "./ResearchTabSection.style";

class ResearchTabSection extends Component {
  state = {
    startTime: 100,
    hours: 0,
    minutes: 0,
    seconds: 0,
    secondsRemaining: 0,
    active: false
  };

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
    const {
      classes,
      active,
      notAbleToBuild,
      toggleResearchModal,
    } = this.props;
    const {
      hours,
      minutes,
      seconds,
      startTime,
    } = this.state;
    const researchDetailsActive = active ? classes.researchImgClicked : '';
    const style = {
      height: `${startTime}%`,
      maxHeight: '100%',
    };
    return (
      <Grid className={classes.researchTechnologyWrapper}>
        <Paper
          className={[classes.energyTechnology, researchDetailsActive].join(' ')}
          onClick={toggleResearchModal}
        >
          {notAbleToBuild && (
            <React.Fragment>
              <div className={classes.timeRemaining}>{hours}h {minutes}m {seconds}s</div>
              <div className={classes.timeLayer} style={style} />
            </React.Fragment>
          )}
        </Paper>
      </Grid>
    )
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
)(withStyles(styles)(ResearchTabSection));
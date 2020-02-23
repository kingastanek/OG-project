import React, { Component } from "react";
import { connect } from 'react-redux';
import { Grid, Typography } from "@material-ui/core";
import strings from "config/strings";
import Menu from 'components/Menu';
import ActionBar from 'components/ActionBar';
import Planets from 'components/Planets';
import ResearchDetailsCard from 'components/ResearchDetailsCard';
import TopResourcesPanel from "components/TopResourcesPanel";
import ResearchTabSection from "components/ResearchTabsSection";
import researchBackground from 'assets/images/researchMainImage.jpg';
import { getResearches } from 'store/actions/researches';
import { withStyles } from "@material-ui/styles";
import styles from "./Research.style";

class Research extends Component {
  state = {
    active: {
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
      allResearchesData: false,
    }
  }

  async componentDidMount() {
    const { getUserResearches } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserResearches(userId);
  }

  toggleResearchModal = () => {
    const { active } = this.state;
    this.setState({ active: !active })
  }

  researchDetailsActive = () => {
    const {
      energyTechnology,
      laserTechnology,
      ionTechnology,
      hyperspaceTechnology,
      plasmaTechnology,
      combustionDrive,
      impulseDrive,
      hyperspaceDrive,
      espionageTechnology,
      computerTechnology,
      astrophysics,
      intergalacticResearchNetwork,
      gravitonTechnology,
      weaponsTechnology,
      shieldingTechnology,
      armorTechnology,
      allResearchesData
    } = this.state;
  }

  render() {
    const { classes, energyTechnology: { isAbleToBuild } } = this.props;
    const { active } = this.state;
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
          <Grid className={classes.researchTabSectionWrapper}>
            <ResearchTabSection
              toggleResearchModal={this.toggleResearchModal}
              active={this.getActiveResearch}
            />
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


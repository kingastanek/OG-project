import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Button,
} from '@material-ui/core';
import { withStyles } from "@material-ui/styles";
import { getResearches, researchLevelUp } from 'store/actions/researches';
import { getResearchesData } from 'config/ResearchesData'
import strings from "config/strings";
import colors from 'config/colors';
import researchesImg from "assets/images/researches.jpg";
import styles from "./ResearchDetailsCard.style";

class ResearchDetailsCard extends Component {
  async componentDidMount() {
    const { getUserResearches } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserResearches(userId);
    this.checkIsAbleToBuild();
  }

  getActiveElement = () => {
    const { activeResearchId, researches } = this.props;
    const { researches: researchesData } = researches;
    return researchesData.find(research => research.techId === activeResearchId);
  }

  onImproveClick = async () => {
    const { researchLevelUp, getUserResearches } = this.props;
    const activeElement = this.getActiveElement();
    const userId = localStorage.getItem('userId');
    await researchLevelUp(userId, activeElement.name)
    await getUserResearches(userId);
    this.checkIsAbleToBuild();
  }

  renderResearchImage = () => {
    const { researches, activeResearchId } = this.props;
    const researchesData = getResearchesData(researches, activeResearchId);
    const activeElement = researchesData.find(research => activeResearchId === research.techId);
    const backgroundPosition = activeElement && activeElement.bigImgBackgroundPosition;
    return activeElement
      ? <div
          style={{
            backgroundPosition,
            backgroundImage: `url(${researchesImg})`,
            boxSizing: 'border-box',
            height: 200,
            width: 200,
            border: `2px solid ${colors.black}`,
            display: 'inline-block',
            backgroundSize: 'cover',
          }}
        />
      : null;
  }

  renderLevel = (plusOne) => {
    const activeElement = this.getActiveElement();
    if (plusOne) return activeElement && activeElement.lvl + 1;
    return activeElement && activeElement.lvl;
  }

  renderTitle = () => {
    const { researches, activeResearchId } = this.props;
    const researchesData = getResearchesData(researches, activeResearchId);
    const activeElement = researchesData.find(research => activeResearchId === research.techId);
    console.log('activeElement', activeElement);
    return activeElement && activeElement.title;
  }

  renderBuildTime = () => {
    const activeElement = this.getActiveElement();
    return activeElement && activeElement.buildTime;
  }

  getResourcesList = () => {
    const activeElement = this.getActiveElement();
    const resourcesList = [
      { name: 'metal', value: activeElement && activeElement.neededMetal },
      { name: 'cristal', value: activeElement && activeElement.neededCristal },
    ];
    return resourcesList;
  }

  getResearchesDescription = () => {
  const { researches, activeResearchId } = this.props;
    const researchesData = getResearchesData(researches, activeResearchId);
    const activeElement = researchesData.find(research => activeResearchId === research.techId);
    return activeElement && activeElement.description;
 }

 checkIsAbleToBuild = () => {
  const { disabled } = this.props;
  const activeElement = this.getActiveElement();
  return(activeElement && activeElement.isAbleToBuild !== 1)|| disabled;
 }

 render() {
  const { classes, disabled, activeResearchId, researchesElements } = this.props;
  const resourcesList = this.getResourcesList();
  const activeElement = researchesElements.find(research => research.techId === activeResearchId);
  return (
    <Grid className={
      activeElement && activeElement.active
        ? classes.researchDetailsActive
        : classes.researchDetails
      }
    >
      {this.renderResearchImage()}
      <Grid className={classes.contentWrapper}>
        <Grid className={classes.mainInformation}>
          <Typography className={classes.mineNameText}>
            {this.renderTitle()}
          </Typography>
          <Typography className={classes.mineLevelText}>
            {strings.LEVEL}: {this.renderLevel(false)}
          </Typography>
        </Grid>
        <Grid className={classes.productionInformation}>
          <Typography className={classes.productionText}>
            {strings.PRODUCTION_DURATION}: {this.renderBuildTime()}
          </Typography>
        </Grid>
        <Grid className={classes.buildCostsWrapper}>
          <Typography className={classes.buildCostsText}>
            {strings.REQUIRED_TO_BUILD} {this.renderLevel(true)}:
          </Typography>
          <List className={classes.list}>
            {resourcesList.map(resource => {
              return (
                <ListItem key={resource.name} className={classes.listItem}>
                   <ListItemIcon className={classes.listItemIcon}>
                    <div className={classes[resource.name]} />
                  </ListItemIcon>
                  <Typography className={classes.resourceText}>{resource.value}</Typography>
                </ListItem>
              )}
            )}
          </List>
        </Grid>
        <Button
          classes={{
            root: classes.improveButton,
            disabled: classes.improveButtonDisabled,
            label: classes.improveButtonLabel
          }}
          onClick={this.onImproveClick}
          disabled={this.checkIsAbleToBuild() || disabled}
        >{strings.IMPROVE}</Button>
      </Grid>
      <Grid className={classes.descriptionWrapper}>
        <Typography className={classes.descriptionText}>
          {this.getResearchesDescription()}
        </Typography>
      </Grid>
    </Grid>
  )
}
}

const mapStateToProps = state => ({
  researches: state.reducer.researches,
});

const mapDispatchToProps = dispatch => ({
  getUserResearches: userId => dispatch(getResearches(userId)),
  researchLevelUp: (userId, researchName) => dispatch(researchLevelUp(userId, researchName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ResearchDetailsCard));

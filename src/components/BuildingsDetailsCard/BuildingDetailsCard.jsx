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
import buildingsImg from "assets/images/buildings.png";
import { getBuildings, buildingLevelUp } from 'store/actions/buildings';
import { getBuildingsData } from 'config/BuildingsData'
import colors from 'config/colors';
import strings from "config/strings";
import styles from "./BuildingDetailsCard.style";

class BuildingDetailsCard extends Component {
  async componentDidMount() {
    const { getUserBuildings } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserBuildings(userId);
    this.checkIsAbleToBuild();
  }

  getActiveElement = () => {
    const { activeBuildingId, buildings } = this.props;
    const { buildings: buildingsData } = buildings;
    return buildingsData.find(building => building.buildingId === activeBuildingId);
  }

  onImproveClick = async () => {
    const { buildingLevelUp, getUserBuildings } = this.props;
    const activeElement = this.getActiveElement();
    const userId = localStorage.getItem('userId');
    await buildingLevelUp(userId, activeElement.name)
    await getUserBuildings(userId);
    this.checkIsAbleToBuild();
  }

  renderBuildingImage = () => {
    const { buildings, activeBuildingId } = this.props;
    const buildingsData = getBuildingsData(buildings, activeBuildingId);
    const activeElement = buildingsData.find(building => activeBuildingId === building.buildingId);
    const backgroundPosition = activeElement && activeElement.bigImgBackgroundPosition;
    return activeElement
      ? <div
          style={{
            backgroundPosition,
            backgroundImage: `url(${buildingsImg})`,
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
    if (plusOne) return activeElement && activeElement.level + 1;
    return activeElement && activeElement.level;
  }

  renderTitle = () => {
    const activeElement = this.getActiveElement();
    return activeElement && strings[activeElement.name];
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

 getBuildingsDescription = () => {
  const { buildings, activeBuildingId } = this.props;
    const buildingsData = getBuildingsData(buildings, activeBuildingId);
    const activeElement = buildingsData.find(building => activeBuildingId === building.buildingId);
    return activeElement && activeElement.description;
 }

 checkIsAbleToBuild = () => {
  const { disabled } = this.props;
  const activeElement = this.getActiveElement();
  return(activeElement && activeElement.isAbleToBuild !== 1)|| disabled;
 }

  render() {
    const { classes, disabled, activeBuildingId, buildingsElements } = this.props;
    const resourcesList = this.getResourcesList();
    const activeElement = buildingsElements.find(building => building.buildingId === activeBuildingId);
    return (
      <Grid className={
        activeElement && activeElement.active
          ? classes.buildingDetailsActive
          : classes.buildingDetails
        }
      >
        {this.renderBuildingImage()}
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
            {this.getBuildingsDescription()}
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  buildings: state.reducer.buildings,
});

const mapDispatchToProps = dispatch => ({
  getUserBuildings: userId => dispatch(getBuildings(userId)),
  buildingLevelUp: (userId, buildingName) => dispatch(buildingLevelUp(userId, buildingName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BuildingDetailsCard));

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
import { getBuildings, buildingLevelUp } from 'store/actions/buildings';
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
    const { classes } = this.props;
    const activeElement = this.getActiveElement();
    switch (activeElement && activeElement.name) {
      case "METAL_MINE": return <div className={classes.metalMineCardImg} />;
      case "CRISTAL_MINE": return  <div className={classes.cristalMineCardImg} />;
      case "DEUTERIUM_MINE": return <div className={classes.deuteriumMineCardImg} />;
      default:
    };
  }

  renderLevel = (plusOne) => {
    const activeElement = this.getActiveElement();
    if (plusOne) return activeElement && activeElement.level + 1;
    return activeElement && activeElement.level;
  }

  renderTitle = () => {
    const activeElement = this.getActiveElement();
    switch (activeElement && activeElement.name) {
      case "METAL_MINE": return strings.METAL_MINE;
      case "CRISTAL_MINE": return strings.CRISTAL_MINE;
      case "DEUTERIUM_MINE": return strings.DEUTERIUM_MINE;
      default:
    };
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
  const activeElement = this.getActiveElement();
    switch (activeElement && activeElement.name) {
      case "METAL_MINE": return strings.METAL_DESCRIPTION;
      case "CRISTAL_MINE": return strings.CRISTAL_DESCRIPTION;
      case "DEUTERIUM_MINE": return strings.DEUTERIUM_DESCRIPTION;
      default:
    };
 }

 checkIsAbleToBuild = () => {
  const { disabled } = this.props;
  const activeElement = this.getActiveElement();
  return(activeElement && activeElement.isAbleToBuild !== 1)|| disabled;
 }

  render() {
    const { classes, disabled, activeBuildingId, buildingElement } = this.props;
    const resourcesList = this.getResourcesList();
    const activeElement = buildingElement.find(building => building.buildingId === activeBuildingId);
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

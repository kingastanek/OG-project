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
  state = {
    metalDisabled: false,
    cristalDisabled: false,
    deuteriumDisabled: false,
  }

  async componentDidMount() {
    const { getUserBuildings } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserBuildings(userId);
    this.checkIsAbleToBuild();
  }

  onImproveClick = async () => {
    const { 
      buildingLevelUp,
      buildings,
      getUserBuildings,
      metalActive,
      cristalActive,
      deuteriumActive,
    } = this.props;
    const { metal, cristal, deuterium } = buildings;
    const userId = localStorage.getItem('userId');
    if (metalActive) await buildingLevelUp(userId, metal.name);
    if (cristalActive) await buildingLevelUp(userId, cristal.name);
    if (deuteriumActive) await buildingLevelUp(userId, deuterium.name);
    await getUserBuildings(userId);
    this.checkIsAbleToBuild();
  }

  renderBuildingImage = () => {
    const {
      classes,
      metalActive,
      cristalActive,
      deuteriumActive,
    } = this.props;
    if (metalActive) return <div className={classes.metalMineCardImg} />
    if (cristalActive) return <div className={classes.cristalMineCardImg} />
    if (deuteriumActive) return <div className={classes.deuteriumMineCardImg} />
    return;
  }

  renderLevel = (plusOne) => {
    const {
      metalActive,
      cristalActive,
      deuteriumActive,
      buildings: {
        metal: { level: metalLevel },
        cristal: { level: cristalLevel },
        deuterium: { level: deuteriumLevel },
      },
    } = this.props;
    const metalLevelFinal = plusOne ? metalLevel + 1 : metalLevel;
    const cristalLevelFinal = plusOne ? cristalLevel + 1 : cristalLevel;
    const deuteriumLevelFinal = plusOne ? deuteriumLevel + 1 : deuteriumLevel;
    return (
      <>
        {metalActive && metalLevelFinal}
        {cristalActive && cristalLevelFinal}
        {deuteriumActive && deuteriumLevelFinal}
      </>
    )
  }

  renderTitle = () => {
    const {
      metalActive,
      cristalActive,
      deuteriumActive,
    } = this.props;
    return (
      <>
        {metalActive && strings.METAL_MINE}
        {cristalActive && strings.CRISTAL_MINE}
        {deuteriumActive && strings.DEUTERIUM_MINE}
      </>
    )
  }

  renderBuildTime = () => {
    const {
      metalActive,
      cristalActive,
      deuteriumActive,
      buildings: {
        metal: { buildTime: metalBuildTime },
        cristal: { buildTime: cristalBuildTime },
        deuterium: { buildTime: deuteriumBuildTime },
      },
    } = this.props;
    return (
      <>
        {metalActive && metalBuildTime}
        {cristalActive && cristalBuildTime}
        {deuteriumActive && deuteriumBuildTime}
      </>
    )
  }

  getResourcesList = () => {
    const {
      metalActive,
      cristalActive,
      deuteriumActive,
      buildings: {
        metal: {
          neededMetal: neededMetalM,
          neededCristal: neededCristalM,
        },
        cristal: {
          neededMetal: neededMetalC,
          neededCristal: neededCristalC,
        },
        deuterium: {
          neededMetal: neededMetalD,
          neededCristal: neededCristalD,
        },
      },
    } = this.props;
    let neededMetal;
    if (metalActive) neededMetal = neededMetalM;
    if (cristalActive) neededMetal = neededMetalC;
    if (deuteriumActive) neededMetal = neededMetalD;
    let neededCristal;
    if (metalActive) neededCristal = neededCristalM;
    if (cristalActive) neededCristal = neededCristalC;
    if (deuteriumActive) neededCristal = neededCristalD;
    const resourcesList = [
      { name: 'metal', value: neededMetal },
      { name: 'cristal', value: neededCristal },
    ];
    return resourcesList;
  }

 getBuildingsDescription = () => {
  const {
    metalActive,
    cristalActive,
    deuteriumActive,
  } = this.props;
  return (
    <>
      {metalActive && strings.METAL_DESCRIPTION}
      {cristalActive && strings.CRISTAL_DESCRIPTION}
      {deuteriumActive && strings.DEUTERIUM_DESCRIPTION}
    </>
  )
 }

 checkIfButtonDisabled = () => {
   const {
    metalActive,
    cristalActive,
    deuteriumActive,
   } = this.props;
   const {
    metalDisabled,
    cristalDisabled,
    deuteriumDisabled,
   } = this.state;
   if (metalActive) return metalDisabled;
   if (cristalActive) return cristalDisabled;
   if (deuteriumActive) return deuteriumDisabled;
 }

 checkIsAbleToBuild = () => {
  const {
    disabled,
    buildings: {
      metal: { isAbleToBuild: metalIsAbleToBuild },
      cristal: { isAbleToBuild: cristalIsAbleToBuild },
      deuterium:{ isAbleToBuild: deuteriumIsAbleToBuild }
    }
  } = this.props;
  (metalIsAbleToBuild === 2 || metalIsAbleToBuild === 0 || disabled)
    && this.setState({ metalDisabled: true });
  (cristalIsAbleToBuild === 2 || cristalIsAbleToBuild === 0 || disabled)
    && this.setState({ cristalDisabled: true });
  (deuteriumIsAbleToBuild === 2 || deuteriumIsAbleToBuild === 0 || disabled)
    && this.setState({ deuteriumDisabled: true });
 }

  render() {
    const {
      classes,
      metalActive,
      cristalActive,
      deuteriumActive,
      disabled: improveDisabled,
    } = this.props;
    const disabled = this.checkIfButtonDisabled();
    const resourcesList = this.getResourcesList();
    const active = metalActive || cristalActive || deuteriumActive;
    return (
      <Grid className={active ? classes.buildingDetailsActive : classes.buildingDetails}>
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
            disabled={disabled || improveDisabled}
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

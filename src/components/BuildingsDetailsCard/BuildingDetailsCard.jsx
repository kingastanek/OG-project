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
    disabled: false,
  }

  async componentDidMount() {
    const { getUserBuildings, disabled } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserBuildings(userId);
    const { buildings, buildings: { metal: { isAbleToBuild } } } = this.props;
    console.log("buildings", buildings)
    console.log("isAbleToBuild", isAbleToBuild)
    if (isAbleToBuild === 1) this.setState({ disabled: false })
    if (isAbleToBuild === 2 || disabled) this.setState({ disabled: true })
  }

  onImproveClick = async () => {
    const { buildingLevelUp, buildings, getUserBuildings } = this.props;
    const { metal } = buildings;
    const userId = localStorage.getItem('userId');
    await buildingLevelUp(userId, metal.name);
    await getUserBuildings(userId);
    const { buildings: { metal: { isAbleToBuild } } } = this.props;
    console.log("isAbleToBuild", isAbleToBuild)
    if (isAbleToBuild === 2) this.setState({ disabled: true })
  }

  render() {
    const { disabled } = this.state;
    const { classes, active, buildings: { metal }, disabled: improveDisabled } = this.props;
    const { neededMetal, neededCristal } = metal;
    const resourcesList = [
      { name: 'metal', value: neededMetal },
      { name: 'cristal', value: neededCristal },
    ];
    return (
      <Grid className={active ? classes.buildingDetailsActive : classes.buildingDetails}>
        <div className={classes.metalMineCardImg} />
        <Grid className={classes.contentWrapper}>
          <Grid className={classes.mainInformation}>
            <Typography className={classes.mineNameText}>
              {strings.METAL_MINE}
            </Typography>
            <Typography className={classes.mineLevelText}>
              {strings.LEVEL}: {metal.level}
            </Typography>
          </Grid>
          <Grid className={classes.productionInformation}>
            <Typography className={classes.productionText}>
              {strings.PRODUCTION_DURATION}: {metal.buildTime}
            </Typography>
            <Typography className={classes.productionText}>
              {strings.ENERGY_NEEDED}: 0
            </Typography>
          </Grid>
          <Grid className={classes.buildCostsWrapper}>
            <Typography className={classes.buildCostsText}>
              {strings.REQUIRED_TO_BUILD} {metal.level+1}:
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
            {strings.METAL_DESCRIPTION}
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

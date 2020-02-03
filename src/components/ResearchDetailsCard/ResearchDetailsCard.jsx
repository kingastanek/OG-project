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
import strings from "config/strings";
import styles from "./ResearchDetailsCard.style";

class ResearchDetailsCard extends Component {
  state = {
    disabled: false,
  }

  async componentDidMount() {
    const { getUserResearches, disabled } = this.props;
    const userId = localStorage.getItem('userId');
    await getUserResearches(userId);
    const { energyTechnology: { isAbleToBuild } } = this.props;
    if (isAbleToBuild === 1) this.setState({ disabled: false })
    if (isAbleToBuild === 2 || disabled) this.setState({ disabled: true })
  }

  onImproveClick = async () => {
    const { researchLevelUp, researches, getUserResearches } = this.props;
    const { energyTechnology: { name } } = researches;
    const userId = localStorage.getItem('userId');
    await researchLevelUp(userId, name);
    await getUserResearches(userId);
    const { energyTechnology: { isAbleToBuild } } = this.props;
    if (isAbleToBuild === 2) this.setState({ disabled: true })
  }

  render() {
    const { disabled } = this.state;
    const {
      classes,
      active,
      energyTechnology,
      disabled: improveDisabled,
    } = this.props;
    const {
      neededMetal,
      neededCristal,
      neededDeuterium,
      buildTime,
      lvl,
    } = energyTechnology;
    const resourcesList = [
      { name: 'metal', value: neededMetal },
      { name: 'cristal', value: neededCristal },
      { name: 'deuterium', value: neededDeuterium },
    ];
    return (
      <Grid className={active ? classes.researchDetailsActive : classes.researchDetails}>
        <div className={classes.researchMineCardImg} />
        <Grid className={classes.contentWrapper}>
          <Grid className={classes.mainInformation}>
            <Typography className={classes.mineNameText}>
              {strings.ENERGY_TECHNOLOGY}
            </Typography>
            <Typography className={classes.mineLevelText}>
              {strings.LEVEL}: {lvl}
            </Typography>
          </Grid>
          <Grid className={classes.productionInformation}>
            <Typography className={classes.productionText}>
              {strings.RESEARCH_TIME}: {buildTime}
            </Typography>
          </Grid>
          <Grid className={classes.buildCostsWrapper}>
            <Typography className={classes.buildCostsText}>
              {strings.REQUIRED_TO_BUILD} {lvl+1}:
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
            >{strings.RESEARCH}</Button>
        </Grid>
        <Grid className={classes.descriptionWrapper}>
          <Typography className={classes.descriptionText}>
            {strings.ENERGY_TECHNOLOGY_DESCRIPTION}
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  energyTechnology: state.reducer.researches.energyTechnology,
});

const mapDispatchToProps = dispatch => ({
  getUserResearches: userId => dispatch(getResearches(userId)),
  researchLevelUp: (userId, buildingName) => dispatch(researchLevelUp(userId, buildingName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ResearchDetailsCard));

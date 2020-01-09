import React from "react";
import { Grid } from '@material-ui/core';
import { withStyles } from "@material-ui/styles";
import styles from "./BuildingDetailsCard.style";

const BuildingDetailsCard = (props) => {
    const { classes, active } = props;
    return (
      <Grid className={active ? classes.buildingDetailsActive : classes.buildingDetails}>
        <div className={classes.metalMineCardImg} />
      </Grid>
    )
  }

export default withStyles(styles)(BuildingDetailsCard);

import React from 'react';
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from './Welcome.style'; 

const Welcome = props => {
  const { classes } = props;
  return (
    <Grid container className={classes.wrapper}>
      Hello World!
    </Grid>
  )
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Welcome);

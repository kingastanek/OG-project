import React, { Component } from 'react';
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types';
import Login from 'components/Login';
import { withStyles } from '@material-ui/styles';
import styles from './Welcome.style'; 

class Welcome extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.wrapper}>
        <Login />
      </Grid>
    );  
  }
 
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Welcome);

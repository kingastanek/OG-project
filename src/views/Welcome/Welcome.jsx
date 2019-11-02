import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Login from "components/Login";
import Registration from "components/Registration";
import strings from "config/strings";
import PropTypes from "prop-types";
import styles from "./Welcome.style";

class Welcome extends Component {
  state = {
    path: "login",
    loginActive: true,
    registrationActive: false
  };

  renderLogin = () => {
    this.setState({
      path: "login",
      loginActive: true,
      registrationActive: false
    });
  };

  renderRegistration = () => {
    this.setState({
      path: "registration",
      registrationActive: true,
      loginActive: false
    });
  };

  render() {
    const { classes } = this.props;
    const { path, loginActive, registrationActive } = this.state;
    const login = path === "login";
    const registration = path === "registration";
    return (
      <Grid container className={classes.container}>
        <Grid className={classes.wrapper}>
          <Grid className={classes.buttonWrapper}>
            <Button
              className={
                loginActive && login
                  ? classes.activeSwitchButton
                  : classes.switchButton
              }
              onClick={this.renderLogin}
            >
              {strings.LOGIN}
            </Button>
            <Button
              className={
                registrationActive && registration
                  ? classes.activeSwitchButton
                  : classes.switchButton
              }
              onClick={this.renderRegistration}
            >
              {strings.REGISTRATION}
            </Button>
          </Grid>
          {loginActive ? <Login /> : <Registration />}
        </Grid>
      </Grid>
    );
  }
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Welcome);

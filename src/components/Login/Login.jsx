import React, { Component } from "react";
import { withRouter } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Grid, Button, Typography } from "@material-ui/core";
import { loginUser } from "store/actions/userConfig";
import strings from "config/strings";
import { withStyles } from "@material-ui/styles";
import styles from "./Login.style";

class Login extends Component {
  state = {
    errorMessage: ""
  };

  onSubmit = async (values) => {
    try {
      const { username, password } = values;
      const { onLoginUser, history } = this.props;
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      await onLoginUser(username, password);
      const { isAuthenticated } = this.props;
      if (isAuthenticated) {
        const path = "/main";
        history.push(path);
      }
    }
    catch {
      this.setState({ errorMessage: strings.LOGIN_FAILURE_MESSAGE });
    }
  };

  render() {
    const { classes, handleSubmit } = this.props;
    const { errorMessage } = this.state;
    return (
      <form
        onSubmit={handleSubmit(this.onSubmit)}
        className={classes.formWrapper}
      >
        <Typography className={classes.errorWrapper}>{errorMessage}</Typography>
        <Grid className={classes.inputWrapper}>
          <label className={classes.formLabel}>{strings.USERNAME}</label>
          <Field
            name="username"
            component="input"
            type="text"
            className={classes.field}
          />
        </Grid>
        <Grid className={classes.inputWrapper}>
          <label className={classes.formLabel}>{strings.PASSWORD}</label>
          <Field
            name="password"
            component="input"
            type="password"
            className={classes.field}
          />
        </Grid>
        <Button
          type="submit"
          classes={{
            root: classes.buttonRoot,
            label: classes.buttonLabel
          }}
        >
          {strings.LOGIN}
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.reducer.userConfig.isAuthenticated,
  user: state.reducer.userConfig.user
});

const mapDispatchToProps = dispatch => ({
  onLoginUser: (username, password) => dispatch(loginUser(username, password))
});

export default compose(
  withRouter,
  withStyles(styles),
  reduxForm({ form: "login" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Login);

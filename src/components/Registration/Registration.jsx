import React, { Component } from "react";
import { withRouter } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Grid, Button } from "@material-ui/core";
import strings from "config/strings";
import { registerUser } from "store/actions/userConfig";
import { withStyles } from "@material-ui/styles";
import styles from "./Registration.style";

class Registration extends Component {
  
  onSubmit = async (values) => {
    const { username, email, password } = values;
    const { onRegisterUser, history } = this.props;
    const newUserData = {
      username,
      email,
      password
    };
    await onRegisterUser(newUserData);
    const { isUserCreated } = this.props;
    if (isUserCreated) {
      const path = "/main";
      history.push(path);
    } else {
      this.setState({ errorMessage: strings.REGISTER_FAILURE_MESSAGE });
    }
  };

  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className={classes.formWrapper}>
        <Grid className={classes.inputWrapper}>
          <label className={classes.formLabel}>{strings.EMAIL}</label>
          <Field
            name="email"
            component="input"
            type="text"
            className={classes.field}
          />
        </Grid>
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
          {strings.REGISTRATION}
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isUserCreated: state.reducer.userConfig.isUserCreated,
});

const mapDispatchToProps = dispatch => ({
  onRegisterUser: (userData) => dispatch(registerUser(userData))
});

export default compose(
  withRouter,
  withStyles(styles),
  reduxForm({ form: "login" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Registration);
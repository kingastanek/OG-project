import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Grid, Button } from "@material-ui/core";
import strings from "config/strings";
import { withStyles } from "@material-ui/styles";
import styles from "./Login.style";

class Login extends Component {
  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className={classes.formWrapper}>
        <Grid className={classes.inputWrapper}>
          <label className={classes.formLabel}>{strings.LOGIN}</label>
          <Field
            name="login"
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

export default reduxForm({
  form: "login"
})(withStyles(styles)(Login));

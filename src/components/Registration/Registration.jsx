import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Grid, Button } from "@material-ui/core";
import strings from "config/strings";
import { withStyles } from "@material-ui/styles";
import styles from "./Registration.style";

class Registration extends Component {
  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className={classes.formWrapper}>
        <Grid className={classes.inputWrapper}>
          <label className={classes.formLabel}>{strings.REGISTRATION}</label>
          <Field
            name="registration"
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

export default reduxForm({
  form: "registraion"
})(withStyles(styles)(Registration));

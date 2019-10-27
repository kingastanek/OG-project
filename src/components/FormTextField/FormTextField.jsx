import React from "react";
import { withStyles } from "@material-ui/styles";
import { TextField } from "@material-ui/core";
import styles from "./FormTextField.style";

const FormTextField = (props) => {
  const {
    classes,
    id,
    label,
  } = props;
  return (
    <TextField
      id={id}
      label={label}
      className={classes.textField}
    />
  );
};

export default withStyles(styles)(FormTextField);

import colors from "config/colors";

export default theme => ({
  formWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  formLabel: {
    display: "block",
    color: colors.white,
    margin: '10px 0',
  },
  field: {
    width: "100%",
    border: "1px solid #31435d",
    boxShadow: "inset 1px 1px 0 #000, inset -1px -1px 0 #000, inset 2px 2px 6px #333",
    padding: "10px 12px",
    boxSizing: "border-box"
  },
  inputWrapper: {
    width: "75%"
  },
  buttonRoot: {
    background: "linear-gradient(180deg,#94e733,#36d521 50%,#1ec725 51%,#008e3a)",
    margin: 20,
    borderRadius: 6,
    "&:hover": {
      background: "linear-gradient(180deg,#90e632,#90e632 50%,#1ec725 51%,#039338)"
    }
  },
  buttonLabel: {
    color: colors.black,
    textShadow: "1px 1px #9fe75c",
    fontWeight: 500,
    textTransform: 'capitalize',
  }
});

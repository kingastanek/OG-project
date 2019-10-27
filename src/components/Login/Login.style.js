import colors from "config/colors";

export default theme => ({
  wrapper: {
    color: colors.white,
    height: "calc(100% - 50px)"
  },
  formWrapper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

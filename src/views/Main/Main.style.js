import colors from "config/colors";

export default theme => ({
  container: {
    height: '100%',
    width: 980,
    margin: '0 auto',
  },
  contentWrapper: {
    display: 'flex',
    width: '100%',
  },
   actionBarContainer: {
    paddingTop: 29,
   },
   centeredWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
   },
   welcomeImg: {
    width: 600,
    height: 300,
    paddingTop: 12,
    borderRadius: 10,
   },
   welcomeTextBlock: {
    position: 'absolute',
    zIndex: '100',
    top: 15,
    right: 40,
    width: 450
   },
   welcomeText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 700
   }
})
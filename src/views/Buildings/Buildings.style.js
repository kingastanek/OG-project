import colors from "config/colors";

export default theme => ({
  container: {
    height: '100%',
    width: 980,
    margin: '0 auto',
  },
  resourcesWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  contentWrapper: {
    width: '100%',
  },
  logo: {
    width: 190,
    height: 70,
    float: 'left',
   },
  commanders: {
    width: 220,
    height: 40,
    paddingTop: 20,
    paddingLeft: 40,
    float: 'right',
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
   buildingsImg: {
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
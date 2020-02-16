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
  mainContentContainer: {
    paddingTop: 29,
    position: 'relative'
  },
  centeredWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  buildingsBigImg: {
    width: 600,
    height: 300,
    paddingTop: 12,
    borderRadius: 10,
  },
  overlayText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 700,
    position: 'absolute',
    zIndex: '100',
    top: 15,
    right: 45,
    width: 450,
  },
  mineTab: {
    backgroundSize: 'cover',
    width: 100,
    height: 100,
    cursor: 'pointer',
    border: `2px solid ${colors.black}`,
    borderRadius: 6,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover' : {
      border: '2px solid #ff9600',
    },
  },
  buildingImgClicked: {
    border: '2px solid #ff9600',
  },
  buildingTabsWrapper: {
    width: 600,
    margin: '0 auto',
  }
})
import colors from "config/colors";
import buildingsImg from 'assets/images/buildings.png';

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
   buildingsMines: {
     width: 600,
     margin: '0 auto',
   },
   metalMineTab: {
     background: `url(${buildingsImg}) 1px 198px`,
     backgroundSize: 'cover',
     width: 100,
     height: 100,
     cursor: 'pointer',
     border: `2px solid ${colors.black}`,
     borderRadius: 6,
     '&:hover' : {
       border: '2px solid #ff9600',
     }
   },
   buildingImgClicked: {
     border: '2px solid #ff9600',
   },
})
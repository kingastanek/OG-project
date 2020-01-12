import buildingsImg from 'assets/images/buildings.png';
import resourcesImg from 'assets/images/resources.png';
import improveButtonImg from 'assets/images/improveButton.png';
import colors from 'config/colors';

const ITEM_WIDTH = 48;
const ITEM_HEIGHT = 32;
const resources = {
  width: ITEM_WIDTH,
  minWidth: ITEM_WIDTH,
  height: ITEM_HEIGHT,
}

const information = {
  boxSizing: 'border-box',
  display: 'inline-block',
  width: 400,
  position: 'absolute',
  padding: 8,
}

export default theme => ({
  buildingDetails: {
    display: 'none',
  },
  buildingDetailsActive: {
    background: '#151f29',
    height: 300,
    width: 600,
    position: 'absolute',
    top: 71,
    left: 26,
    color: 'white',
    zIndex: 100,
    borderRadius: 4,
  },
  metalMineCardImg: {
    boxSizing: 'border-box',
    height: 200,
    width: 200,
    background: `url(${buildingsImg}) 1px 198px`,
    border: `2px solid ${colors.black}`,
    display: 'inline-block',
   },
   mainInformation: {
     ...information,
     top: 0,
   },
   mineNameText: { 
    color: '#ff9600',
    fontSize: 14,
    fontWeight: 700,
    float: 'left',
   },
   mineLevelText: {
    fontSize: 12,
    fontWeight: 500,
    color: '#ff9600',
    float: 'right',
   },
   productionInformation: {
    ...information,
    top: 21,
   },
   productionText: {
     color: '#848484',
     fontSize: 12,
   },
   contentWrapper: {
    background: 'linear-gradient(180deg,#39485a,#293441 50%,#192129 51%,#192330)',
    height: 200,
    display: 'inline-block',
    width: 400,
    position: 'absolute',
    top: 0,
   },
   descriptionWrapper: {
     boxSizing: 'border-box',
     background: '#151f29',
     width: '100%',
     height: 95,
     padding: 8,
   },
   descriptionText: {
    color: '#848484',
    fontSize: 12,
   },
   buildCostsWrapper: {
    position: 'absolute',
    top: 120,
    padding: 8,
   },
   buildCostsText: {
    color: '#848484',
    fontSize: 12,
    paddingBottom: 2,
   },
   list: {
    display: 'flex',
    padding: 0,
   },
   listItem: {
    display: 'block',
    padding: 0,
    textAlign: 'center',
   },
   listItemIcon: {
    display: 'flex',
    justifyContent: 'center',
   },
   metal: {
    ...resources,
    background: `url(${resourcesImg}) 0 -160px`,
   },
   cristal: {
    ...resources,
    background: `url(${resourcesImg}) -48px -160px`,
  },
  resourceText: {
    color: colors.white,
    fontSize: 11,
  },
  improveButton: {
    background: `url(${improveButtonImg})`,
    width: 138,
    height: 50,
    borderRadius: 4,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  improveButtonLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 700,
    textTransformation: 'lower',
  }
});


import resourcesImg from 'assets/images/resources.png';
import colors from 'config/colors';

const ITEM_WIDTH = 48;
const ITEM_HEIGHT = 32;
const FONT_SIZE = 9;
const ITEM_MARGIN = 38;
const resources = {
  width: ITEM_WIDTH,
  minWidth: ITEM_WIDTH,
  height: ITEM_HEIGHT,
}

export default theme => ({
  list: {
    display: 'flex',
    height: ITEM_HEIGHT,
    paddingTop: 20,
    paddingLeft: 40,
  },
  listItem: {
    display: 'block',
    minWidth: ITEM_WIDTH,
    width: ITEM_WIDTH,
    padding: 0,
    marginRight: ITEM_MARGIN,
  },
  resourceText: {
    color: colors.white,
    fontSize: FONT_SIZE,
    width: ITEM_WIDTH,
    textAlign: 'center',
  },
  metal: {
    ...resources,
    background: `url(${resourcesImg}) 0 -160px`,
  },
  cristal: {
    ...resources,
    background: `url(${resourcesImg}) -48px -160px`,
  },
  deuterium: {
    ...resources,
    background: `url(${resourcesImg}) -96px -160px`,
  },
  darkMatter: {
    ...resources,
    background: `url(${resourcesImg}) -192px -160px`,
  },
  energy: {
    ...resources,
    background: `url(${resourcesImg}) -144px -160px`,
  },
});


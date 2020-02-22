import colors from "config/colors";
import researchesImg from 'assets/images/researches.jpg';

export default theme => ({
  researchTechnologyWrapper: {
    width: 600,
    margin: '0 auto',
  },
  energyTechnology: {
    backgroundImage: `url(${researchesImg})`,
    backgroundPosition: '1px 198px',
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
  timeLayer: {
   position: 'absolute',
   bottom: 0,
   background: 'rgba(0, 0, 0, 0.7)',
   width: 100,
  },
  researchImgClicked: {
    border: '2px solid #ff9600',
  },
  timeRemaining: {
    zIndex: 20,
    textAlign: 'center',
    color: colors.white,
    fontSize: 12,
    height: 18,
    width: '100%',
    background: '#0d1014',
  },
});

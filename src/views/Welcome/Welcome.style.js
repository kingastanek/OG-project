import background from '../../assets/images/background.jpg';
import colors from 'config/colors';

const switchButton = {
  width: '50%',
  color: colors.white,
  fontSize: 15,
  fontWeight: 700,
  textTransform: 'capitalize',
  padding: 12,
  borderRadius: 0,
}

export default theme => ({
  container: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh',
  },
  wrapper: {
    height: 450,
    width: 400,
    background: `linear-gradient(180deg, ${colors.main[300]}, ${colors.black})`,
    display: 'flex',
    alignSelf: 'center',
    margin: '0 auto',
    position: 'relative',
  },
  buttonWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    top: -49,
    position: 'absolute',
  },
  switchButton: {
    ...switchButton,
    background: `${colors.main[900]}`,
    '&:hover': {
      background: colors.main[300],
    },
  },
  activeSwitchButton: {
    ...switchButton,
    background: colors.main[300],
  },
  activeClass: {
    background: colors.main[300]
  }
})
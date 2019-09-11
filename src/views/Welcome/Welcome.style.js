import background from '../../background.jpg';

export default theme => ({
  wrapper: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh',
  }
})
import background from '../../assets/images/mainBackground.jpg';

export default theme => ({
  container: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh',
  },
})
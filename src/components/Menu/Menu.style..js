import colors from 'config/colors';

export default theme => ({
  listItem: {
    '&:first-child': {
      paddingTop: 16,
    }
  },
  linksText: {
    background: 'linear-gradient(180deg,#39485a,#39485a 50%,#192129 51%,#192330)',
    color: '#747e88',
    textAlign: 'center',
    textDecoration: 'none',
    width: 136,
    padding: 6,
    border: '1px solid black',
    borderRadius: 10,
  },
  activeLink: {
    color: colors.white,
    width: 136,
    background: 'linear-gradient(180deg,#7796ab,#7796ab 50%,#7796ab 51%,#192330)',
  }
});


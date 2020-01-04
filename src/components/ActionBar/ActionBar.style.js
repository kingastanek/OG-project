export default theme => ({
  actionBar: {
    height: 30,
    background: 'linear-gradient(180deg,#39485a,#293441 50%,#192129 51%,#192330)',
    width: 600,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
   },
   actionBarText: {
    textTransform: 'uppercase',
    color: '#6f9fc8',
    fontSize: 11,
    fontWeight: 700,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
   },
   actionBarSide: {
    width: 110,
    height: 40,
    background: 'linear-gradient(180deg,#39485a,#293441 50%,#192129 51%,#192330)',
    border: '2px double black',
    borderRadius: 10,
   },
   actionBarCenter: {
    background: 'linear-gradient(180deg,#39485a,#293441 50%,#192129 51%,#192330)',
    width: 380,
    height: 40,
    margin: '0 5px',
    border: '2px double black',
    borderRadius: 10,
   }
});

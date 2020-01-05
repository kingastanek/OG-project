export default theme => ({
  planetsBar: {
    background: 'linear-gradient(180deg,#39485a,#293441 50%,#192129 51%,#192330)',
    height: 40,
    margin: '22px 5px',
    border: '2px double black',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
   },
   planetsText: {
     fontSize: 12,
     color: '#6f9fc8',
   },
   homeworldWrapper: {
     width: '100%',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center'
   },
   homeworldText: {
     width: '100%',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     color: '#6f9fc8',
     fontSize: 12,
     marginTop: 6,
   },
   planetHoverText: {
    color: '#9C0',
   },
   planetHover: {
    border: '2px solid #9C0',
    borderRadius: '50%',
    boxShadow: '0 0 6px 1px #9C0, inset 0 0 3px 4px #9C0'
   }
});

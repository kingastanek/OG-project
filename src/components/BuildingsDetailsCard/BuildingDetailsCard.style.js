import buildingsImg from 'assets/images/buildings.png';

export default theme => ({
  buildingDetails: {
    display: 'none',
  },
  buildingDetailsActive :{
    background: 'linear-gradient(180deg,#39485a,#293441 50%,#192129 51%,#192330)',
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
    height: 100,
    width: 200,
    background: `url(${buildingsImg}) 1px 198px`,
   }
});

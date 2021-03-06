import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import userConfig from './userConfig';
import resources from './resources';
import buildings from './buildings';
import researches from './researches';

export default combineReducers({
  routing,
  form,
  userConfig,
  resources,
  buildings,
  researches,
});

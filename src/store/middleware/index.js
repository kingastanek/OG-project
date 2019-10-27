import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { compose, applyMiddleware } from 'redux';
import api from './api';

const middleware = [api, thunk, routerMiddleware(window.history)];

export default compose(applyMiddleware(...middleware));

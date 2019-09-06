import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import imagesReducer from './images';

export default history =>
  combineReducers({
    router: connectRouter(history),
    imagesReducer,
  });

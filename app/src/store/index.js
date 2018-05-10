import { createStore } from 'redux';
import composedEnhacers from './enhancers';
import { combineReducers } from 'redux-immutablejs';
import initialState from './initialState';
import { reducer as appReducer } from './models/app';
import { reducer as configReducer} from './models/config';
import { reducer as mainReducer } from './models/main';
import { reducer as RouterReducer } from '../router';
import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist-immutable'

const combinedReducers = combineReducers({
  app:    appReducer,
  config: configReducer,
  main:   mainReducer,
  nav:    RouterReducer
});

const store = createStore(
  combinedReducers,
  initialState,
  composedEnhacers
);
persistStore(store, {
  blacklist: ['nav'],
  storage: AsyncStorage
});

export default store;

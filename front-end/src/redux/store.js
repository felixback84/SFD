// redux stuff
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';
import devicesReducer from './reducers/devicesReducer';
import adventuresReducer from './reducers/adventuresReducer';

// redux stuff
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';
import dataSetsReducer from './reducers/dataSetsReducer';
import devicesReducer from './reducers/devicesReducer';
import adventuresReducer from './reducers/adventuresReducer';

// empty initial state
const initialState = {};

// middlaware of redux
const middleware = [thunk];

// combine object reducers
const reducers = combineReducers({
    ui: uiReducer,
    user: userReducer,
    dataDevice: dataSetsReducer,
    devices: devicesReducer,
    adventures: adventuresReducer
});

// creation of store and dev redux tools
const store = createStore(
    reducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
); 
export default store;
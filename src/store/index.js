import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import app from './appReducer';
import auth from './authReducer';
import profile from './profileReducer';
import preference from './preferenceReducer';
import squad from './squadReducer';

const createAppStore = (initialState = {}) => {
    const reducer =  combineReducers({
        app,
        auth,
        profile,
        preference,
        squad
    });

    const middleware = applyMiddleware(promise, thunk, createLogger());

    return createStore(reducer, initialState, middleware);
};

export default createAppStore;

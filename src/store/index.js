import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import app from './appReducer';

const createAppStore = (initialState = {}) => {
    const reducer =  combineReducers({
        app,
    });

    const middleware = applyMiddleware(promise, thunk, createLogger());

    return createStore(reducer, initialState, middleware);
};

export default createAppStore;

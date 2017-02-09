const redux = require('redux');
const { createStore } = redux;
const applyMiddleware = redux.applyMiddleware;
const thunk = require('redux-thunk').default;
const promise = require('redux-promise');
const createLogger = require('redux-logger');
const searchReducer = require('./reducers/index');

const logger = createLogger();

const store = createStore(searchReducer, applyMiddleware(thunk, promise, logger));

module.exports = store;
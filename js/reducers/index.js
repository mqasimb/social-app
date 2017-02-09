const react = require('react');
const actions = require('../actions/index');

var initialState = {
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''}
    };

var searchReducer = function(state, action) {
    state = state || initialState;
    
    var newState = Object.assign({}, state);
    
    if(action.type === actions.UPDATE_REGISTRATION_INPUT) {
        var newChange = {};
        newChange[action.inputName] = action.inputValue;
        newState.registerInput = Object.assign({}, newState.registerInput, newChange);
        return newState;
    }
    
    if(action.type === actions.UPDATE_LOGIN_INPUT) {
        var newChange = {};
        newChange[action.inputName] = action.inputValue;
        newState.loginInput = Object.assign({}, newState.loginInput, newChange);
        return newState;
    }
    
    return state;
}

module.exports = searchReducer;
const react = require('react');
const actions = require('../actions/index');

var initialState = {
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: false, user: {}},
        newPost: {content: '', image: null},
        postData: [],
        singlePost: {},
        postLoading: true,
        isEdit: false,
        editInput: {content: ''},
        commentsInput: {}
    };

var searchReducer = function(state, action) {
    state = state || initialState;
    var newState = Object.assign({}, state);
    
    if(action.type === actions.EDIT_INPUT) {
        newChange = {};
        newChange[action.inputName] = action.inputValue;
        newState.editInput = Object.assign({}, newChange);
        return newState;
    }
    
    if(action.type === actions.COMMENT_INPUT_CHANGE) {
        var newChange = {};
        newChange[action.inputName] = action.inputValue;
        newState.commentsInput = Object.assign({}, newChange);
        return newState;
    }
    
    if(action.type === actions.EDIT_POST_ENABLE) {
        newState.isEdit = true;
        return newState;
    }
    
    if(action.type === actions.EDIT_POST_DISABLE) {
        newState.isEdit = false;
        return newState;
    }
    
    if(action.type === actions.SINGLE_POST_FETCH_SUCCESSFUL) {
        var newChange = action.data.data;
        newState.singlePost = Object.assign({}, newChange);
        newState.postLoading = false;
        return newState;
    }
    
    if(action.type === actions.DISMOUNT_SINGLE_POST) {
        newState.isEdit = false;
        newState.postLoading = true;
        newState.singlePost = Object.assign({});
        return newState;
    }
    
    if(action.type === actions.POST_FETCH_SUCCESSFUL) {
        var newChange = action.data.data;
        newState.postData = newChange.slice();
        return newState;
    }
    
    if(action.type === actions.UPDATE_POST_INPUT) {
        var newChange = {};
        newChange[action.inputName] = action.inputValue;
        newState.newPost = Object.assign({}, newChange);
        return newState;
    }
    
    if(action.type === actions.USER_LOGGED_IN) {
        var newChange = {};
        newChange.authenticated = true;
        newChange.user = action.user;
        newState.auth = Object.assign({}, newChange);
        return newState;
    }
    
    if(action.type === actions.USER_LOGGED_OUT) {
        var newChange = {};
        newChange.authenticated = false;
        newChange.user = {};
        newState.auth = Object.assign({}, newChange);
        return newState;
    }
    
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
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
        commentsInput: {},
        uploadedFile: '',
        uploadedFileCloudinaryUrl: '',
        flashMessages: {},
        showModal: false
    };

var appReducer = function(state, action) {
    state = state || initialState;
    var newState = Object.assign({}, state);

    if(action.type === actions.TOGGLE_MODAL) {
        newState.showModal = action.toggle;
        return newState;
    }
    
    if(action.type === actions.REGISTRATION_SUCCESFUL) {
        newState.flashMessages.newlyRegistered = 'You have succesfully registered!'
        newState.flashMessages = Object.assign({}, newState.flashMessages);
        return newState;
    }
    
    if(action.type === actions.POST_SUCCESSFUL) {
        newState.newPost.content = '';
        newState.newPost.image = null;
        newState.newPost = Object.assign({}, newState.newPost);
        newState.uploadedFile = '';
        newState.uploadedFileCloudinaryUrl = '';
        return newState;
    }
    
    if(action.type === actions.COMMENT_SUBMIT_SUCCESS) {
        newState.commentsInput[action.inputName] = '';
        newState.commentsInput = Object.assign({}, newState.commentsInput);
        return newState;
    }
    
    if(action.type === actions.UPLOAD_FILE) {
        newState.uploadedFile = action.files;
        return newState;
    }
    
    if(action.type === actions.SET_UPLOAD_FILE_CLOUDINARY_URL) {
        newState.uploadedFileCloudinaryUrl = action.url;
        newState.newPost.image = action.url;
        newState.newPost = Object.assign({}, newState.newPost);
        return newState;
    }
    
    if(action.type === actions.EDIT_INPUT) {
        newChange = {};
        newChange[action.inputName] = action.inputValue;
        newState.editInput = Object.assign({}, newChange);
        return newState;
    }
    
    if(action.type === actions.COMMENT_INPUT_CHANGE) {
        newState.commentsInput[action.inputName] = action.inputValue;
        newState.commentsInput = Object.assign({}, newState.commentsInput);
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
        newState.newPost[action.inputName] = action.inputValue;
        newState.newPost = Object.assign({}, newState.newPost);
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

module.exports = appReducer;
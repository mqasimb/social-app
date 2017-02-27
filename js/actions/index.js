var fetch = require('isomorphic-fetch');
var axios = require('axios');
var jwtdecode = require('jwt-decode');
var router = require('react-router');

const USER_LOGGED_IN = 'USER_LOGGED_IN';
function userLoggedIn(decodedToken) {
    return {
        type: USER_LOGGED_IN,
        user: decodedToken
    }
}

const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
function userLoggedOut() {
    return {
        type: USER_LOGGED_OUT,
    }
}

function logoutAction(loginData) {
    return function(dispatch) {
            localStorage.removeItem('jwt');
            setAuthorizationToken(false);
            dispatch(userLoggedOut());
        }
}

const UPDATE_REGISTRATION_INPUT = 'UPDATE_REGISTRATION_INPUT';
function updateRegistrationInput(inputName, inputValue) {
    return {
        type: UPDATE_REGISTRATION_INPUT,
        inputValue: inputValue,
        inputName: inputName
    }
}

const REGISTRATION_SUCCESFUL = 'REGISTRATION_SUCCESFUL';
function registrationSuccesful() {
    return {
        type: REGISTRATION_SUCCESFUL
    }
}

const UPDATE_LOGIN_INPUT = 'UPDATE_LOGIN_INPUT';
function updateLoginInput(inputName, inputValue) {
    return {
        type: UPDATE_LOGIN_INPUT,
        inputValue: inputValue,
        inputName: inputName
    }
}

function registerAction(registerData) {
    return function(dispatch) {
        return axios.post('/users/register', registerData)
        .then(function(response) {
            dispatch(registrationSuccesful());
            router.browserHistory.push('/login');
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

function loginAction(loginData) {
    return function(dispatch) {
        return axios.post('/users/login', loginData)
        .then(function(response) {
            const token = response.data.token;
            localStorage.setItem('jwt', token);
            setAuthorizationToken(token);
            var decoded = jwtdecode(token);
            dispatch(userLoggedIn(decoded));
            return true;
        })
    }
}

function setAuthorizationToken(token) {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

const UPDATE_POST_INPUT = 'UPDATE_POST_INPUT';
function updatePostInput(inputName, inputValue) {
    return ({
        type: UPDATE_POST_INPUT,
        inputName: inputName,
        inputValue: inputValue
    })
}

function submitPostToServer(data) {
    return function(dispatch) {
        return axios.post('/api/post', data)
        .then(function(response) {
            dispatch(postSuccesful());
            return dispatch(getPosts());
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const POST_SUCCESSFUL = 'POST_SUCCESSFUL';
function postSuccesful() {
    return ({
        type: POST_SUCCESSFUL
    })
}

function getPosts() {
    return function(dispatch) {
        return axios.get('/api/post')
        .then(function(response) {
            console.log(response);
            return dispatch(postFetchSuccessful(response));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const POST_FETCH_SUCCESSFUL = 'POST_FETCH_SUCCESSFUL';
function postFetchSuccessful(data) {
    return ({
        type: POST_FETCH_SUCCESSFUL,
        data: data
    })
}

const DISMOUNT_SINGLE_POST = 'DISMOUNT_SINGLE_POST';
function dismountSinglePost() {
    return ({
        type: DISMOUNT_SINGLE_POST,
    })
}

function getSinglePost(id) {
    return function(dispatch) {
        return axios.get('/api/post/'+id)
        .then(function(response) {
            console.log(response);
            dispatch(singlePostFetchSuccessful(response));
            return response;
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const SINGLE_POST_FETCH_SUCCESSFUL = 'SINGLE_POST_FETCH_SUCCESSFUL';
function singlePostFetchSuccessful(data) {
    return ({
        type: SINGLE_POST_FETCH_SUCCESSFUL,
        data: data
    })
}

function deletePost(id) {
    return function(dispatch) {
        return axios.delete('/api/post/'+id)
        .then(function(response) {
            return dispatch(getPosts());
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

function editPost(id) {
    return function(dispatch) {
        return axios.put('/api/post/'+id)
        .then(function(response) {
            console.log(response);
            return dispatch(getPosts());
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const EDIT_POST_ENABLE = 'EDIT_POST_ENABLE';
function editPostEnable() {
    return ({
        type: EDIT_POST_ENABLE
    })
}

const EDIT_POST_DISABLE = 'EDIT_POST_DISABLE';
function editPostDisable() {
    return ({
        type: EDIT_POST_DISABLE
    })
}

function updateLikeStatus(postID) {
    return function(dispatch) {
        return axios.post('/api/likes/'+postID)
        .then(function(response) {
            return dispatch(getPosts());
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const LIKE_STATUS_CHANGE_SUCCESSFUL = 'LIKE_STATUS_CHANGE_SUCCESSFUL';
function likeStatusChangeSuccessful(data) {
    return ({
        type: LIKE_STATUS_CHANGE_SUCCESSFUL,
        data: data
    })
}

const COMMENT_INPUT_CHANGE = 'COMMENT_INPUT_CHANGE';
function commentInputChange(inputName, inputValue) {
    return ({
        type: COMMENT_INPUT_CHANGE,
        inputName: inputName,
        inputValue: inputValue
    })
}

const COMMENT_SUBMIT_SUCCESS = 'COMMENT_SUBMIT_SUCCESS';
function commentSubmitSuccess(inputName) {
    return ({
        type: COMMENT_SUBMIT_SUCCESS,
        inputName: inputName
    })
}

const COMMENT_EDIT_SUCCESS = 'COMMENT_EDIT_SUCCESS';
function commentEditSuccess(postID, commentID, data) {
    return ({
        type: COMMENT_EDIT_SUCCESS,
        postID: postID,
        commentID: commentID,
        data: data
    })
}

function submitComment(postID, data) {
    return function(dispatch) {
        return axios.post('/api/comments/'+postID, data)
        .then(function(response) {
            dispatch(commentSubmitSuccess(postID));
            return dispatch(getPosts());
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

function editComment(postID, commentID, data) {
    return function(dispatch) {
        return axios.put('/api/comments/'+postID+'/'+commentID, data)
        .then(function(response) {
            dispatch(toggleEditComment(commentID, false));
            console.log(data)
            dispatch(commentEditSuccess(postID, commentID, data));
            
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const TOGGLE_EDIT_COMMENT = 'TOGGLE_EDIT_COMMENT';
function toggleEditComment(commentID, toggle) {
    return ({
        type: TOGGLE_EDIT_COMMENT,
        commentID: commentID,
        toggle: toggle
    })
}

function deleteComment(postID, commentID) {
    return function(dispatch) {
        return axios.delete('/api/comments/'+postID+'/'+commentID)
        .then(function(response) {
            return dispatch(commentDeleteSuccess(postID, commentID));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const COMMENT_DELETE_SUCCESS = 'COMMENT_DELETE_SUCCESS';
function commentDeleteSuccess(postID, commentID) {
    return ({
        type: COMMENT_DELETE_SUCCESS,
        postID: postID,
        commentID: commentID
    })
}

const EDIT_INPUT = 'EDIT_INPUT';
function editInput(inputName, inputValue) {
    return ({
        type: EDIT_INPUT,
        inputName: inputName,
        inputValue: inputValue
    })
}

function submitEdittedPost(postID, data) {
    return function(dispatch) {
        return axios.put('/api/post/'+postID, data)
        .then(function(response) {
            return response;
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const CLOUDINARY_UPLOAD_PRESET = 'khh5rnsu';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/your_cloudinary_app_name/upload';

const SET_UPLOAD_FILE_CLOUDINARY_URL = 'SET_UPLOAD_FILE_CLOUDINARY_URL';
function setCloudinaryURL(url) {
    return ({
        type: SET_UPLOAD_FILE_CLOUDINARY_URL,
        url: url
    })
}

const UPLOAD_FILE = 'UPLOAD_FILE';
function uploadFile(files) {
    return ({
        type: UPLOAD_FILE,
        files: files
    })
}

const TOGGLE_MODAL = 'TOGGLE_MODAL';
function toggleModal(postID, toggle) {
    return ({
        type: TOGGLE_MODAL,
        postID: postID,
        toggle: toggle
    })
}

exports.deleteComment = deleteComment;
exports.COMMENT_DELETE_SUCCESS = COMMENT_DELETE_SUCCESS;
exports.commentDeleteSuccess = commentDeleteSuccess;

exports.commentEditSuccess = commentEditSuccess;
exports.COMMENT_EDIT_SUCCESS = COMMENT_EDIT_SUCCESS;

exports.editComment = editComment;
exports.TOGGLE_EDIT_COMMENT = TOGGLE_EDIT_COMMENT;
exports.toggleEditComment = toggleEditComment;

exports.toggleModal = toggleModal;
exports.TOGGLE_MODAL = TOGGLE_MODAL;

exports.REGISTRATION_SUCCESFUL = REGISTRATION_SUCCESFUL;
exports.registrationSuccesful = registrationSuccesful;

exports.postSuccesful = postSuccesful;
exports.POST_SUCCESSFUL = POST_SUCCESSFUL;

exports.commentSubmitSuccess = commentSubmitSuccess;
exports.COMMENT_SUBMIT_SUCCESS = COMMENT_SUBMIT_SUCCESS;

exports.SET_UPLOAD_FILE_CLOUDINARY_URL = SET_UPLOAD_FILE_CLOUDINARY_URL;
exports.setCloudinaryURL = setCloudinaryURL;

exports.uploadFile = uploadFile;
exports.UPLOAD_FILE = UPLOAD_FILE;

exports.submitEdittedPost = submitEdittedPost;
exports.EDIT_INPUT = EDIT_INPUT;
exports.editInput = editInput;

exports.COMMENT_INPUT_CHANGE = COMMENT_INPUT_CHANGE;
exports.commentInputChange = commentInputChange;

exports.submitComment = submitComment;

exports.DISMOUNT_SINGLE_POST = DISMOUNT_SINGLE_POST;
exports.dismountSinglePost = dismountSinglePost;

exports.EDIT_POST_ENABLE = EDIT_POST_ENABLE;
exports.editPostEnable = editPostEnable;

exports.EDIT_POST_DISABLE = EDIT_POST_DISABLE;
exports.editPostDisable = editPostDisable;

exports.updateLikeStatus = updateLikeStatus;
exports.editPost = editPost;
exports.deletePost = deletePost;
exports.getSinglePost = getSinglePost;
exports.SINGLE_POST_FETCH_SUCCESSFUL = SINGLE_POST_FETCH_SUCCESSFUL;

exports.getPosts = getPosts;
exports.POST_FETCH_SUCCESSFUL = POST_FETCH_SUCCESSFUL;

exports.submitPostToServer = submitPostToServer;
exports.updatePostInput = updatePostInput;
exports.UPDATE_POST_INPUT = UPDATE_POST_INPUT;

exports.logoutAction = logoutAction;
exports.userLoggedOut = userLoggedOut;
exports.USER_LOGGED_OUT = USER_LOGGED_OUT;
exports.userLoggedIn = userLoggedIn;
exports.USER_LOGGED_IN = USER_LOGGED_IN;
exports.setAuthorizationToken = setAuthorizationToken;
exports.loginAction = loginAction;
exports.registerAction = registerAction;
exports.UPDATE_REGISTRATION_INPUT = UPDATE_REGISTRATION_INPUT;
exports.updateRegistrationInput = updateRegistrationInput;
exports.UPDATE_LOGIN_INPUT = UPDATE_LOGIN_INPUT;
exports.updateLoginInput = updateLoginInput;
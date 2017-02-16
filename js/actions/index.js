var fetch = require('isomorphic-fetch');
var axios = require('axios');
var jwtdecode = require('jwt-decode');


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
        return axios.post('https://react-bqasim381.c9users.io/users/register', registerData);
    }
}

function loginAction(loginData) {
    return function(dispatch) {
        return axios.post('https://react-bqasim381.c9users.io/users/login', loginData)
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
        return axios.post('https://react-bqasim381.c9users.io/api/post', data)
        .then(function(response) {
            console.log(response);
            return dispatch(getPosts());
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

function getPosts() {
    return function(dispatch) {
        return axios.get('https://react-bqasim381.c9users.io/api/post')
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
        return axios.get('https://react-bqasim381.c9users.io/api/post/'+id)
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
        return axios.delete('https://react-bqasim381.c9users.io/api/post/'+id)
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
        return axios.put('https://react-bqasim381.c9users.io/api/post/'+id)
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
        return axios.post('https://react-bqasim381.c9users.io/api/likes/'+postID)
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

function submitComment(postID, data) {
    return function(dispatch) {
        return axios.post('https://react-bqasim381.c9users.io/api/comments/'+postID, data)
        .then(function(response) {
            return dispatch(getPosts());
        })
        .catch(function(err) {
            console.log(err);
        })
    }
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
        return axios.put('https://react-bqasim381.c9users.io/api/post/'+postID, data)
        .then(function(response) {
            return response;
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

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
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
        })
    }
}

function setAuthorizationToken(token) {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`
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

function getSinglePost(id) {
    return function(dispatch) {
        return axios.get('https://react-bqasim381.c9users.io/api/post/'+id)
        .then(function(response) {
            console.log(response);
            return dispatch(singlePostFetchSuccessful(response));
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
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
        return axios.get('http://localhost:8080/api/post')
        .then(function(response) {
            console.log(response);
            dispatch(getMainUserProfile());
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

function updateLikeStatus(postID, userID) {
    return function(dispatch) {
        return axios.post('/api/likes/'+postID)
        .then(function(response) {
            return dispatch(likeStatusChangeSuccessful(postID, userID));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const LIKE_STATUS_CHANGE_SUCCESSFUL = 'LIKE_STATUS_CHANGE_SUCCESSFUL';
function likeStatusChangeSuccessful(postID, userID) {
    return ({
        type: LIKE_STATUS_CHANGE_SUCCESSFUL,
        postID: postID,
        userID: userID
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
function commentSubmitSuccess(postID, data, serverData) {
    return ({
        type: COMMENT_SUBMIT_SUCCESS,
        postID: postID,
        data: data,
        serverData: serverData
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
            console.log(response.data)
            dispatch(commentSubmitSuccess(postID, data, response.data));
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

const TOGGLE_EDIT_POST = 'TOGGLE_EDIT_POST';
function toggleEditPost(postID, toggle) {
    return ({
        type: TOGGLE_EDIT_POST,
        postID: postID,
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

const EDIT_POST_SUCCESSFUL = 'EDIT_POST_SUCCESSFUL';
function editPostSuccessful(postID, values) {
    return ({
        type: EDIT_POST_SUCCESSFUL,
        postID: postID,
        values: values
    })
}

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

const SET_PROFILE_PIC_CLOUDINARY_URL = 'SET_PROFILE_PIC_CLOUDINARY_URL';
function setProfilePicCloudinaryURL(url) {
    return ({
        type: SET_PROFILE_PIC_CLOUDINARY_URL,
        url: url
    })
}

const UPLOAD_PROFILE_PIC = 'UPLOAD_PROFILE_PIC';
function uploadProfilePic(files) {
    return ({
        type: UPLOAD_PROFILE_PIC,
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

function getProfile(username) {
    return function(dispatch) {
        return axios.get('/api/profile/'+username)
        .then(function(response) {
            dispatch(getProfileSuccess(response.data));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
function getProfileSuccess(data) {
    return ({
        type: GET_PROFILE_SUCCESS,
        data: data
    })
}

const CHANGE_PICTURE_MODAL = 'CHANGE_PICTURE_MODAL';
function changePictureModal(username, toggle) {
    return ({
        type: CHANGE_PICTURE_MODAL,
        username: username,
        toggle: toggle
    })
}

function postNewProfilePicture(username, pictureURL) {
    return function(dispatch) {
        return axios.put('/api/profile/picture/'+username, pictureURL)
        .then(function(response) {
            dispatch(postProfilePicSuccessful());
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const POST_PROFILE_PIC_SUCCESFUL = 'POST_PROFILE_PIC_SUCCESFUL' 
function postProfilePicSuccessful() {
    return({
        type: POST_PROFILE_PIC_SUCCESFUL
    })
}

const CHANGE_ABOUT_ME = 'CHANGE_ABOUT_ME' 
function changeAboutMe(toggle) {
    return({
        type: CHANGE_ABOUT_ME,
        toggle: toggle
    })
}

function postProfileAboutMe(username, aboutMe) {
    return function(dispatch) {
        return axios.put('/api/profile/aboutme/'+username, aboutMe)
        .then(function(response) {
            dispatch(postProfileAboutMeSuccessful(aboutMe));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const POST_PROFILE_ABOUT_ME_SUCCESFUL = 'POST_PROFILE_ABOUT_ME_SUCCESFUL' 
function postProfileAboutMeSuccessful(aboutMe) {
    return({
        type: POST_PROFILE_ABOUT_ME_SUCCESFUL,
        aboutMe: aboutMe
    })
}

function sendFriendRequest(username, ProfilePicture) {
    return function(dispatch) {
        return axios.post('/api/friend/add/'+username)
        .then(function(response) {
            console.log(response.data)
            dispatch(sendFriendRequestSuccesful(username, ProfilePicture));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const SEND_FRIEND_REQUEST_SUCCESFUL = 'SEND_FRIEND_REQUEST_SUCCESFUL' 
function sendFriendRequestSuccesful(username, ProfilePicture) {
    return({
        type: SEND_FRIEND_REQUEST_SUCCESFUL,
        username: username,
        ProfilePicture: ProfilePicture
    })
}

function cancelFriendRequest(username) {
    return function(dispatch) {
        return axios.put('/api/friend/cancel/'+username)
        .then(function(response) {
            dispatch(cancelFriendRequestSuccesful(username));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const CANCEL_FRIEND_REQUEST_SUCCESFUL = 'CANCEL_FRIEND_REQUEST_SUCCESFUL' 
function cancelFriendRequestSuccesful(username) {
    return({
        type: CANCEL_FRIEND_REQUEST_SUCCESFUL,
        username: username
    })
}

function confirmFriendRequest(username) {
    return function(dispatch) {
        return axios.put('/api/friend/confirm/'+username)
        .then(function(response) {
            dispatch(confirmFriendRequestSuccesful(username));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const CONFIRM_FRIEND_REQUEST_SUCCESFUL = 'CONFIRM_FRIEND_REQUEST_SUCCESFUL' 
function confirmFriendRequestSuccesful(username) {
    return({
        type: CONFIRM_FRIEND_REQUEST_SUCCESFUL,
        username: username
    })
}

function denyFriendRequest(username) {
    return function(dispatch) {
        return axios.put('/api/friend/deny/'+username)
        .then(function(response) {
            dispatch(denyFriendRequestSuccesful(username));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const DENY_FRIEND_REQUEST_SUCCESFUL = 'DENY_FRIEND_REQUEST_SUCCESFUL' 
function denyFriendRequestSuccesful(username) {
    return({
        type: DENY_FRIEND_REQUEST_SUCCESFUL,
        username: username
    })
}

function removeFriendRequest(username) {
    return function(dispatch) {
        return axios.put('/api/friend/remove/'+username)
        .then(function(response) {
            dispatch(removeFriendRequestSuccesful(username));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const REMOVE_FRIEND_REQUEST_SUCCESFUL = 'REMOVE_FRIEND_REQUEST_SUCCESFUL' 
function removeFriendRequestSuccesful(username) {
    return({
        type: REMOVE_FRIEND_REQUEST_SUCCESFUL,
        username: username
    })
}

const RECEIVED_FRIEND_REQUEST = 'RECEIVED_FRIEND_REQUEST' 
function receivedFriendRequest(username, ProfilePicture) {
    return({
        type: RECEIVED_FRIEND_REQUEST,
        username: username,
        ProfilePicture: ProfilePicture
    })
}

const ACCEPTED_FRIEND_REQUEST = 'ACCEPTED_FRIEND_REQUEST' 
function acceptedFriendRequest(username) {
    return({
        type: ACCEPTED_FRIEND_REQUEST,
        username: username
    })
}

const CANCELLED_FRIEND_REQUEST = 'CANCELLED_FRIEND_REQUEST' 
function cancelledFriendRequest(username) {
    return({
        type: CANCELLED_FRIEND_REQUEST,
        username: username
    })
}

const DENIED_FRIEND_REQUEST = 'DENIED_FRIEND_REQUEST' 
function deniedFriendRequest(username) {
    return({
        type: DENIED_FRIEND_REQUEST,
        username: username
    })
}

const REMOVED_AS_FRIEND = 'REMOVED_AS_FRIEND' 
function removedAsFriend(username) {
    return({
        type: REMOVED_AS_FRIEND,
        username: username
    })
}

function getMainUserProfile() {
    return function(dispatch) {
        return axios.get('/api/profile/')
        .then(function(response) {
            return dispatch(getMainProfileSuccess(response.data));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const GET_MAIN_PROFILE_SUCCESS = 'GET_MAIN_PROFILE_SUCCESS';
function getMainProfileSuccess(data) {
    return ({
        type: GET_MAIN_PROFILE_SUCCESS,
        data: data
    })
}

function getSearchUserNames(search) {
    return function(dispatch) {
        return axios.post('/api/search/profile', search)
        .then(function(response) {
            return dispatch(getSearchUserNamesSuccess(response.data));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const GET_SEARCH_USERNAMES_SUCCESS = 'GET_SEARCH_USERNAMES_SUCCESS';
function getSearchUserNamesSuccess(data) {
    return ({
        type: GET_SEARCH_USERNAMES_SUCCESS,
        data: data
    })
}

const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
function messageReceived(data) {
    console.log(data)
    return ({
        type: MESSAGE_RECEIVED,
        data: data
    })
}

const FRIEND_ONLINE = 'FRIEND_ONLINE';
function friendOnline(username) {
    return ({
        type: FRIEND_ONLINE,
        username: username
    })
}

const OPEN_CHAT = 'OPEN_CHAT';
function openChat(data) {
    return ({
        type: OPEN_CHAT,
        data: data
    })
}

const OPEN_CHAT_WITH_SOCKET = 'OPEN_CHAT_WITH_SOCKET';
function openChatWithSocket(data) {
    return ({
        type: OPEN_CHAT_WITH_SOCKET,
        data: data
    })
}

const CHAT_SUBMIT = 'CHAT_SUBMIT';
function chatSubmit(data) {
    return ({
        type: CHAT_SUBMIT,
        data: data
    })
}

const SET_MESSAGE_IMAGE_CLOUDINARY_URL = 'SET_MESSAGE_IMAGE_CLOUDINARY_URL';
function setMessageImageCloudinaryURL(url, friendUsername) {
    return ({
        type: SET_MESSAGE_IMAGE_CLOUDINARY_URL,
        url: url,
        friendUsername: friendUsername
    })
}

const UPLOAD_MESSAGE_IMAGE = 'UPLOAD_MESSAGE_IMAGE';
function uploadMessageImage(files, friendUsername) {
    return ({
        type: UPLOAD_MESSAGE_IMAGE,
        files: files,
        friendUsername: friendUsername
    })
}

const USER_CONNECT = 'USER_CONNECT';
function userConnect(username) {
    return ({
        type: USER_CONNECT,
        username: username
    })
}

const USER_DISCONNECT = 'USER_DISCONNECT';
function userDisconnect(username) {
    return ({
        type: USER_DISCONNECT,
        username: username
    })
}

function persistMessage(username, data) {
    return function(dispatch) {
        return axios.post('/api/message', data)
        .then(function(response) {
            return response.data
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

const SAVE_MESSAGES_TO_PROFILE = 'SAVE_MESSAGES_TO_PROFILE';
function saveMessagesToProfile(friend, data) {
    return ({
        type: SAVE_MESSAGES_TO_PROFILE,
        friend: friend,
        data: data
    })
}

const LOAD_OLDER_MESSAGES = 'LOAD_OLDER_MESSAGES';
function loadOlderMessages(friend) {
    return ({
        type: LOAD_OLDER_MESSAGES,
        friend: friend
    })
}

exports.EDIT_POST_SUCCESSFUL = EDIT_POST_SUCCESSFUL;
exports.editPostSuccessful = editPostSuccessful;

exports.TOGGLE_EDIT_POST = TOGGLE_EDIT_POST;
exports.toggleEditPost = toggleEditPost;

exports.LOAD_OLDER_MESSAGES = LOAD_OLDER_MESSAGES;
exports.loadOlderMessages = loadOlderMessages;

exports.SAVE_MESSAGES_TO_PROFILE = SAVE_MESSAGES_TO_PROFILE;
exports.saveMessagesToProfile = saveMessagesToProfile;

exports.persistMessage = persistMessage;

exports.REMOVED_AS_FRIEND = REMOVED_AS_FRIEND;
exports.removedAsFriend = removedAsFriend;

exports.RECEIVED_FRIEND_REQUEST = RECEIVED_FRIEND_REQUEST; 
exports.receivedFriendRequest = receivedFriendRequest;
    
exports.ACCEPTED_FRIEND_REQUEST = ACCEPTED_FRIEND_REQUEST; 
exports.acceptedFriendRequest = acceptedFriendRequest;

exports.CANCELLED_FRIEND_REQUEST = CANCELLED_FRIEND_REQUEST; 
exports.cancelledFriendRequest = cancelledFriendRequest;

exports.DENIED_FRIEND_REQUEST = DENIED_FRIEND_REQUEST
exports.deniedFriendRequest = deniedFriendRequest; 

exports.USER_CONNECT = USER_CONNECT;
exports.userConnect = userConnect;

exports.USER_DISCONNECT = USER_DISCONNECT;
exports.userDisconnect = userDisconnect;

exports.SET_MESSAGE_IMAGE_CLOUDINARY_URL = SET_MESSAGE_IMAGE_CLOUDINARY_URL;
exports.setMessageImageCloudinaryURL = setMessageImageCloudinaryURL;
exports.UPLOAD_MESSAGE_IMAGE = UPLOAD_MESSAGE_IMAGE;
exports.uploadMessageImage = uploadMessageImage;

exports.chatSubmit = chatSubmit;
exports.CHAT_SUBMIT = CHAT_SUBMIT;

exports.OPEN_CHAT_WITH_SOCKET = OPEN_CHAT_WITH_SOCKET;
exports.openChatWithSocket = openChatWithSocket;

exports.OPEN_CHAT = OPEN_CHAT;
exports.openChat = openChat;

exports.FRIEND_ONLINE = FRIEND_ONLINE;
exports.friendOnline = friendOnline;

exports.MESSAGE_RECEIVED = MESSAGE_RECEIVED;
exports.messageReceived = messageReceived;

exports.getSearchUserNames = getSearchUserNames;
exports.GET_SEARCH_USERNAMES_SUCCESS = GET_SEARCH_USERNAMES_SUCCESS;
exports.getSearchUserNamesSuccess = getSearchUserNamesSuccess;

exports.removeFriendRequest = removeFriendRequest;
exports.REMOVE_FRIEND_REQUEST_SUCCESFUL = REMOVE_FRIEND_REQUEST_SUCCESFUL;
exports.removeFriendRequestSuccesful = removeFriendRequestSuccesful;

exports.getMainProfileSuccess = getMainProfileSuccess;
exports.GET_MAIN_PROFILE_SUCCESS = GET_MAIN_PROFILE_SUCCESS;
exports.getMainUserProfile = getMainUserProfile;

exports.sendFriendRequest = sendFriendRequest;

exports.SEND_FRIEND_REQUEST_SUCCESFUL = SEND_FRIEND_REQUEST_SUCCESFUL;
exports.sendFriendRequestSuccesful = sendFriendRequestSuccesful;
exports.cancelFriendRequest = cancelFriendRequest;

exports.CANCEL_FRIEND_REQUEST_SUCCESFUL = CANCEL_FRIEND_REQUEST_SUCCESFUL; 
exports.cancelFriendRequestSuccesful = cancelFriendRequestSuccesful;

exports.confirmFriendRequest = confirmFriendRequest;

exports.CONFIRM_FRIEND_REQUEST_SUCCESFUL = CONFIRM_FRIEND_REQUEST_SUCCESFUL;
exports.confirmFriendRequestSuccesful = confirmFriendRequestSuccesful;

exports.denyFriendRequest = denyFriendRequest;

exports.DENY_FRIEND_REQUEST_SUCCESFUL = DENY_FRIEND_REQUEST_SUCCESFUL;
exports.denyFriendRequestSuccesful = denyFriendRequestSuccesful;

exports.postFetchSuccessful = postFetchSuccessful;
exports.likeStatusChangeSuccessful = likeStatusChangeSuccessful;
exports.LIKE_STATUS_CHANGE_SUCCESSFUL = LIKE_STATUS_CHANGE_SUCCESSFUL;

exports.changeAboutMe = changeAboutMe;
exports.CHANGE_ABOUT_ME = CHANGE_ABOUT_ME;

exports.postProfileAboutMe = postProfileAboutMe;
exports.POST_PROFILE_ABOUT_ME_SUCCESFUL = POST_PROFILE_ABOUT_ME_SUCCESFUL;
exports.postProfileAboutMeSuccessful = postProfileAboutMeSuccessful;
exports.POST_PROFILE_PIC_SUCCESFUL = POST_PROFILE_PIC_SUCCESFUL

exports.SET_PROFILE_PIC_CLOUDINARY_URL = SET_PROFILE_PIC_CLOUDINARY_URL;
exports.setProfilePicCloudinaryURL = setProfilePicCloudinaryURL;

exports.UPLOAD_PROFILE_PIC = UPLOAD_PROFILE_PIC;
exports.uploadProfilePic = uploadProfilePic;
exports.postNewProfilePicture = postNewProfilePicture;

exports.CHANGE_PICTURE_MODAL = CHANGE_PICTURE_MODAL;
exports.changePictureModal = changePictureModal;

exports.getProfile = getProfile;
exports.getProfileSuccess = getProfileSuccess;
exports.GET_PROFILE_SUCCESS = GET_PROFILE_SUCCESS;

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

exports.postProfilePicSuccessful = postProfilePicSuccessful;
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
const axios = require('axios');
const jwtdecode = require('jwt-decode');
const router = require('react-router');

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export function userLoggedIn(decodedToken) {
    return {
        type: USER_LOGGED_IN,
        user: decodedToken
    }
}

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export function userLoggedOut() {
    return {
        type: USER_LOGGED_OUT,
    }
}

export function logoutAction(loginData) {
    return function(dispatch) {
            localStorage.removeItem('jwt');
            setAuthorizationToken(false);
            dispatch(userLoggedOut());
        }
}

export const REGISTRATION_SUCCESFUL = 'REGISTRATION_SUCCESFUL';
export function registrationSuccesful() {
    return {
        type: REGISTRATION_SUCCESFUL
    }
}

export function registerAction(registerData) {
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

export function loginAction(loginData) {
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

export function setAuthorizationToken(token) {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const UPDATE_POST_INPUT = 'UPDATE_POST_INPUT';
export function updatePostInput(inputName, inputValue) {
    return ({
        type: UPDATE_POST_INPUT,
        inputName: inputName,
        inputValue: inputValue
    })
}

export function submitPostToServer(data) {
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

export const POST_SUCCESSFUL = 'POST_SUCCESSFUL';
export function postSuccesful() {
    return ({
        type: POST_SUCCESSFUL
    })
}

export function getPosts() {
    return function(dispatch) {
        return axios.get('/api/post')
        .then(function(response) {
            dispatch(getMainUserProfile());
            return dispatch(postFetchSuccessful(response));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const POST_FETCH_SUCCESSFUL = 'POST_FETCH_SUCCESSFUL';
export function postFetchSuccessful(data) {
    return ({
        type: POST_FETCH_SUCCESSFUL,
        data: data
    })
}

export const DISMOUNT_SINGLE_POST = 'DISMOUNT_SINGLE_POST';
export function dismountSinglePost() {
    return ({
        type: DISMOUNT_SINGLE_POST,
    })
}

export function getSinglePost(id) {
    return function(dispatch) {
        return axios.get('/api/post/'+id)
        .then(function(response) {
            dispatch(singlePostFetchSuccessful(response));
            return response;
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const SINGLE_POST_FETCH_SUCCESSFUL = 'SINGLE_POST_FETCH_SUCCESSFUL';
export function singlePostFetchSuccessful(data) {
    return ({
        type: SINGLE_POST_FETCH_SUCCESSFUL,
        data: data
    })
}

export function deletePost(id) {
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

export function editPost(id) {
    return function(dispatch) {
        return axios.put('/api/post/'+id)
        .then(function(response) {
            return dispatch(getPosts());
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const EDIT_POST_ENABLE = 'EDIT_POST_ENABLE';
export function editPostEnable() {
    return ({
        type: EDIT_POST_ENABLE
    })
}

export const EDIT_POST_DISABLE = 'EDIT_POST_DISABLE';
export function editPostDisable() {
    return ({
        type: EDIT_POST_DISABLE
    })
}

export function updateLikeStatus(postID, userID) {
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

export const LIKE_STATUS_CHANGE_SUCCESSFUL = 'LIKE_STATUS_CHANGE_SUCCESSFUL';
export function likeStatusChangeSuccessful(postID, userID) {
    return ({
        type: LIKE_STATUS_CHANGE_SUCCESSFUL,
        postID: postID,
        userID: userID
    })
}

export const COMMENT_INPUT_CHANGE = 'COMMENT_INPUT_CHANGE';
export function commentInputChange(inputName, inputValue) {
    return ({
        type: COMMENT_INPUT_CHANGE,
        inputName: inputName,
        inputValue: inputValue
    })
}

export const COMMENT_SUBMIT_SUCCESS = 'COMMENT_SUBMIT_SUCCESS';
export function commentSubmitSuccess(postID, data, serverData) {
    return ({
        type: COMMENT_SUBMIT_SUCCESS,
        postID: postID,
        data: data,
        serverData: serverData
    })
}

export const COMMENT_EDIT_SUCCESS = 'COMMENT_EDIT_SUCCESS';
export function commentEditSuccess(postID, commentID, data) {
    return ({
        type: COMMENT_EDIT_SUCCESS,
        postID: postID,
        commentID: commentID,
        data: data
    })
}

export function submitComment(postID, data) {
    return function(dispatch) {
        return axios.post('/api/comments/'+postID, data)
        .then(function(response) {
            dispatch(commentSubmitSuccess(postID, data, response.data));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export function editComment(postID, commentID, data) {
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

export const TOGGLE_EDIT_COMMENT = 'TOGGLE_EDIT_COMMENT';
export function toggleEditComment(commentID, toggle) {
    return ({
        type: TOGGLE_EDIT_COMMENT,
        commentID: commentID,
        toggle: toggle
    })
}

export const TOGGLE_EDIT_POST = 'TOGGLE_EDIT_POST';
export function toggleEditPost(postID, toggle) {
    return ({
        type: TOGGLE_EDIT_POST,
        postID: postID,
        toggle: toggle
    })
}

export function deleteComment(postID, commentID) {
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

export const COMMENT_DELETE_SUCCESS = 'COMMENT_DELETE_SUCCESS';
export function commentDeleteSuccess(postID, commentID) {
    return ({
        type: COMMENT_DELETE_SUCCESS,
        postID: postID,
        commentID: commentID
    })
}

export const EDIT_INPUT = 'EDIT_INPUT';
export function editInput(inputName, inputValue) {
    return ({
        type: EDIT_INPUT,
        inputName: inputName,
        inputValue: inputValue
    })
}

export function submitEdittedPost(postID, data) {
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

export const EDIT_POST_SUCCESSFUL = 'EDIT_POST_SUCCESSFUL';
export function editPostSuccessful(postID, values) {
    return ({
        type: EDIT_POST_SUCCESSFUL,
        postID: postID,
        values: values
    })
}

export const SET_UPLOAD_FILE_CLOUDINARY_URL = 'SET_UPLOAD_FILE_CLOUDINARY_URL';
export function setCloudinaryURL(url) {
    return ({
        type: SET_UPLOAD_FILE_CLOUDINARY_URL,
        url: url
    })
}

export const UPLOAD_FILE = 'UPLOAD_FILE';
export function uploadFile(files) {
    return ({
        type: UPLOAD_FILE,
        files: files
    })
}

export const SET_PROFILE_PIC_CLOUDINARY_URL = 'SET_PROFILE_PIC_CLOUDINARY_URL';
export function setProfilePicCloudinaryURL(url) {
    return ({
        type: SET_PROFILE_PIC_CLOUDINARY_URL,
        url: url
    })
}

export const UPLOAD_PROFILE_PIC = 'UPLOAD_PROFILE_PIC';
export function uploadProfilePic(files) {
    return ({
        type: UPLOAD_PROFILE_PIC,
        files: files
    })
}

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export function toggleModal(postID, toggle) {
    return ({
        type: TOGGLE_MODAL,
        postID: postID,
        toggle: toggle
    })
}

export function getProfile(username) {
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

export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export function getProfileSuccess(data) {
    return ({
        type: GET_PROFILE_SUCCESS,
        data: data
    })
}

export const CHANGE_PICTURE_MODAL = 'CHANGE_PICTURE_MODAL';
export function changePictureModal(username, toggle) {
    return ({
        type: CHANGE_PICTURE_MODAL,
        username: username,
        toggle: toggle
    })
}

export function postNewProfilePicture(username, pictureURL) {
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

export const POST_PROFILE_PIC_SUCCESFUL = 'POST_PROFILE_PIC_SUCCESFUL' 
export function postProfilePicSuccessful() {
    return({
        type: POST_PROFILE_PIC_SUCCESFUL
    })
}

export const CHANGE_ABOUT_ME = 'CHANGE_ABOUT_ME' 
export function changeAboutMe(toggle) {
    return({
        type: CHANGE_ABOUT_ME,
        toggle: toggle
    })
}

export function postProfileAboutMe(username, aboutMe) {
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

export const POST_PROFILE_ABOUT_ME_SUCCESFUL = 'POST_PROFILE_ABOUT_ME_SUCCESFUL' 
export function postProfileAboutMeSuccessful(aboutMe) {
    return({
        type: POST_PROFILE_ABOUT_ME_SUCCESFUL,
        aboutMe: aboutMe
    })
}

export function sendFriendRequest(username, ProfilePicture) {
    return function(dispatch) {
        return axios.post('/api/friend/add/'+username)
        .then(function(response) {
            dispatch(sendFriendRequestSuccesful(username, ProfilePicture));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const SEND_FRIEND_REQUEST_SUCCESFUL = 'SEND_FRIEND_REQUEST_SUCCESFUL' 
export function sendFriendRequestSuccesful(username, ProfilePicture) {
    return({
        type: SEND_FRIEND_REQUEST_SUCCESFUL,
        username: username,
        ProfilePicture: ProfilePicture
    })
}

export function cancelFriendRequest(username) {
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

export const CANCEL_FRIEND_REQUEST_SUCCESFUL = 'CANCEL_FRIEND_REQUEST_SUCCESFUL' 
export function cancelFriendRequestSuccesful(username) {
    return({
        type: CANCEL_FRIEND_REQUEST_SUCCESFUL,
        username: username
    })
}

export function confirmFriendRequest(username) {
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

export const CONFIRM_FRIEND_REQUEST_SUCCESFUL = 'CONFIRM_FRIEND_REQUEST_SUCCESFUL' 
export function confirmFriendRequestSuccesful(username) {
    return({
        type: CONFIRM_FRIEND_REQUEST_SUCCESFUL,
        username: username
    })
}

export function denyFriendRequest(username) {
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

export const DENY_FRIEND_REQUEST_SUCCESFUL = 'DENY_FRIEND_REQUEST_SUCCESFUL' 
export function denyFriendRequestSuccesful(username) {
    return({
        type: DENY_FRIEND_REQUEST_SUCCESFUL,
        username: username
    })
}

export function removeFriendRequest(username) {
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

export const REMOVE_FRIEND_REQUEST_SUCCESFUL = 'REMOVE_FRIEND_REQUEST_SUCCESFUL' 
export function removeFriendRequestSuccesful(username) {
    return({
        type: REMOVE_FRIEND_REQUEST_SUCCESFUL,
        username: username
    })
}

export const RECEIVED_FRIEND_REQUEST = 'RECEIVED_FRIEND_REQUEST' 
export function receivedFriendRequest(username, ProfilePicture) {
    return({
        type: RECEIVED_FRIEND_REQUEST,
        username: username,
        ProfilePicture: ProfilePicture
    })
}

export const ACCEPTED_FRIEND_REQUEST = 'ACCEPTED_FRIEND_REQUEST' 
export function acceptedFriendRequest(username) {
    return({
        type: ACCEPTED_FRIEND_REQUEST,
        username: username
    })
}

export const CANCELLED_FRIEND_REQUEST = 'CANCELLED_FRIEND_REQUEST' 
export function cancelledFriendRequest(username) {
    return({
        type: CANCELLED_FRIEND_REQUEST,
        username: username
    })
}

export const DENIED_FRIEND_REQUEST = 'DENIED_FRIEND_REQUEST' 
export function deniedFriendRequest(username) {
    return({
        type: DENIED_FRIEND_REQUEST,
        username: username
    })
}

export const REMOVED_AS_FRIEND = 'REMOVED_AS_FRIEND' 
export function removedAsFriend(username) {
    return({
        type: REMOVED_AS_FRIEND,
        username: username
    })
}

export function getMainUserProfile() {
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

export const GET_MAIN_PROFILE_SUCCESS = 'GET_MAIN_PROFILE_SUCCESS';
export function getMainProfileSuccess(data) {
    return ({
        type: GET_MAIN_PROFILE_SUCCESS,
        data: data
    })
}

export function getSearchUserNames(search) {
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

export const GET_SEARCH_USERNAMES_SUCCESS = 'GET_SEARCH_USERNAMES_SUCCESS';
export function getSearchUserNamesSuccess(data) {
    return ({
        type: GET_SEARCH_USERNAMES_SUCCESS,
        data: data
    })
}

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export function messageReceived(data) {
    return ({
        type: MESSAGE_RECEIVED,
        data: data
    })
}

export const FRIEND_ONLINE = 'FRIEND_ONLINE';
export function friendOnline(username) {
    return ({
        type: FRIEND_ONLINE,
        username: username
    })
}

export const OPEN_CHAT = 'OPEN_CHAT';
export function openChat(data) {
    return ({
        type: OPEN_CHAT,
        data: data
    })
}

export const CLOSE_CHAT = 'CLOSE_CHAT';
export function closeChat(username) {
    return ({
        type: CLOSE_CHAT,
        username: username
    })
}

export const OPEN_CHAT_WITH_SOCKET = 'OPEN_CHAT_WITH_SOCKET';
export function openChatWithSocket(data) {
    return ({
        type: OPEN_CHAT_WITH_SOCKET,
        data: data
    })
}

export const CHAT_SUBMIT = 'CHAT_SUBMIT';
export function chatSubmit(data) {
    return ({
        type: CHAT_SUBMIT,
        data: data
    })
}

export const SET_MESSAGE_IMAGE_CLOUDINARY_URL = 'SET_MESSAGE_IMAGE_CLOUDINARY_URL';
export function setMessageImageCloudinaryURL(url, friendUsername) {
    return ({
        type: SET_MESSAGE_IMAGE_CLOUDINARY_URL,
        url: url,
        friendUsername: friendUsername
    })
}

export const UPLOAD_MESSAGE_IMAGE = 'UPLOAD_MESSAGE_IMAGE';
export function uploadMessageImage(files, friendUsername) {
    return ({
        type: UPLOAD_MESSAGE_IMAGE,
        files: files,
        friendUsername: friendUsername
    })
}

export const USER_CONNECT = 'USER_CONNECT';
export function userConnect(username) {
    return ({
        type: USER_CONNECT,
        username: username
    })
}

export const USER_DISCONNECT = 'USER_DISCONNECT';
export function userDisconnect(username) {
    return ({
        type: USER_DISCONNECT,
        username: username
    })
}

export function persistMessage(username, data) {
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

export const SAVE_MESSAGES_TO_PROFILE = 'SAVE_MESSAGES_TO_PROFILE';
export function saveMessagesToProfile(friend, data) {
    return ({
        type: SAVE_MESSAGES_TO_PROFILE,
        friend: friend,
        data: data
    })
}

export const LOAD_OLDER_MESSAGES = 'LOAD_OLDER_MESSAGES';
export function loadOlderMessages(friend) {
    return ({
        type: LOAD_OLDER_MESSAGES,
        friend: friend
    })
}

export const LIKE_GAME = 'LIKE_GAME';
export function likeGame(data) {
    return ({
        type: LIKE_GAME,
        data: data
    })
}
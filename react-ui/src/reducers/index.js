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
        showModal: {toggle: false, postID: null},
        showPictureModal: {toggle: false, username: null},
        editComment: {},
        loadedProfile: {},
        mainProfile: {},
        chatMessages: {},
        uploadedProfilePic: '',
        uploadedProfilePicCloudinaryUrl: '',
        profilePosts: [],
        changeAboutMe: false,
        userSearchResults: [],
        friendsOnline: [],
        chatsOpen: []
    };

var appReducer = function(state, action) {
    state = state || initialState;
    var newState = Object.assign({}, state);
    
    if(action.type === actions.CHAT_SUBMIT) {
        newState.chatMessages[action.data.friend].push(action.data);
        newState.chatMessages = Object.assign({}, newState.chatMessages);
        return newState;
    }

    if(action.type === actions.OPEN_CHAT) {
        if((action.data.friend != newState.auth.user.username)) {
            newState.chatsOpen[action.data.friend] = action.data.roomName;
            newState.chatsOpen = Object.assign({}, newState.chatsOpen);
        }
        if(newState.chatMessages[action.data.friend] === undefined) {
            newState.chatMessages[action.data.friend] = [];
            newState.chatMessages = Object.assign({}, newState.chatMessages);
        }
        return newState;
    }

    if(action.type === actions.OPEN_CHAT_WITH_SOCKET) {
        if((action.data.username != newState.auth.user.username)) {
            newState.chatsOpen[action.data.username] = action.data.roomName;
            newState.chatsOpen = Object.assign({}, newState.chatsOpen);
        }
        if(newState.chatMessages[action.data.username] === undefined) {
            newState.chatMessages[action.data.username] = [];
            newState.chatMessages = Object.assign({}, newState.chatMessages);
        }
        return newState;
    }

    if(action.type === actions.FRIEND_ONLINE) {
        newState.friendsOnline.push(action.username);
        newState.friendsOnline = newState.friendsOnline.slice();
        return newState;
    }

    if(action.type === actions.MESSAGE_RECEIVED) {
        newState.chatMessages[action.data.username].push(action.data);
        newState.chatMessages = Object.assign({}, newState.chatMessages);
        return newState;
    }

    if(action.type === actions.GET_SEARCH_USERNAMES_SUCCESS) {
        newState.userSearchResults = action.data;
        newState.userSearchResults = newState.userSearchResults.slice();
        return newState;
    }

    if(action.type === actions.SEND_FRIEND_REQUEST_SUCCESFUL) {
        newState.mainProfile.outgoingRequests.push({username: newState.loadedProfile.username});
        newState.mainProfile.outgoingRequests = newState.mainProfile.outgoingRequests.slice();
        newState.mainProfile = Object.assign({}, newState.mainProfile);
        return newState;
    }
    
    if(action.type === actions.CANCEL_FRIEND_REQUEST_SUCCESFUL) {
        var firstIndex = newState.mainProfile.outgoingRequests.findIndex(function(request) {
            return request.username == newState.loadedProfile.username;
        })
        if(firstIndex > -1) {
            newState.mainProfile.outgoingRequests.splice(firstIndex, 1);
            newState.mainProfile.outgoingRequests = newState.mainProfile.outgoingRequests.slice();
            newState.mainProfile = Object.assign({}, newState.mainProfile);  
        }
        return newState;
    }
      
    if(action.type === actions.CONFIRM_FRIEND_REQUEST_SUCCESFUL) {
        var firstIndex = newState.mainProfile.incomingRequests.findIndex(function(request) {
            return request.username == newState.loadedProfile.username;
        })
        if(firstIndex > -1) {
            newState.mainProfile.incomingRequests.splice(firstIndex, 1);
            newState.mainProfile.incomingRequests = newState.mainProfile.outgoingRequests.slice();
            newState.mainProfile.Friends.push({username: newState.loadedProfile.username});
            newState.mainProfile.Friends = newState.mainProfile.Friends.slice();
            newState.mainProfile = Object.assign({}, newState.mainProfile);  
        }
        return newState;
    }
    
    if(action.type === actions.REMOVE_FRIEND_REQUEST_SUCCESFUL) {
        var firstIndex = newState.mainProfile.Friends.findIndex(function(request) {
            return request.username == newState.loadedProfile.username;
        })
        if(firstIndex > -1) {
            newState.mainProfile.Friends.splice(firstIndex, 1);
            newState.mainProfile.Friends = newState.mainProfile.Friends.slice();
            newState.mainProfile = Object.assign({}, newState.mainProfile);  
        }
        return newState;
    }
    
    if(action.type === actions.DENY_FRIEND_REQUEST_SUCCESFUL) {
        var firstIndex = newState.mainProfile.incomingRequests.findIndex(function(request) {
            return request.username == newState.loadedProfile.username;
        })
        if(firstIndex > -1) {
            newState.mainProfile.incomingRequests.splice(firstIndex, 1);
            newState.mainProfile.incomingRequests = newState.mainProfile.incomingRequests.slice();
            newState.mainProfile = Object.assign({}, newState.mainProfile);  
        }
        return newState;
    }
    
    
    if(action.type === actions.GET_MAIN_PROFILE_SUCCESS) {
        newState.mainProfile = action.data;
        newState.mainProfile = Object.assign({}, newState.mainProfile);
        return newState;
    }
    
    if(action.type === actions.POST_PROFILE_ABOUT_ME_SUCCESFUL) {
        newState.loadedProfile.AboutMe = action.aboutMe.aboutMe;
        newState.loadedProfile = Object.assign({}, newState.loadedProfile);
        return newState;
    }
     
    if(action.type === actions.CHANGE_ABOUT_ME) {
        newState.changeAboutMe = action.toggle;
        return newState;
    }
    
    if(action.type === actions.POST_PROFILE_PIC_SUCCESFUL) {
        newState.loadedProfile.ProfilePicture = newState.uploadedProfilePicCloudinaryUrl;
        newState.loadedProfile = Object.assign({}, newState.loadedProfile);
        newState.uploadedProfilePic = '';
        newState.uploadedProfilePicCloudinaryUrl = '';
        newState.showPictureModal = {toggle: false, username: null}
        return newState;
    }
    
    if(action.type === actions.UPLOAD_PROFILE_PIC) {
        newState.uploadedProfilePic = action.files;
        return newState;
    }
    
    if(action.type === actions.SET_PROFILE_PIC_CLOUDINARY_URL) {
        newState.uploadedProfilePicCloudinaryUrl = action.url;
        return newState;
    }
    
    if(action.type === actions.CHANGE_PICTURE_MODAL) {
        newState.showPictureModal = {toggle: action.toggle, username: action.username};
        newState.showPictureModal = Object.assign({}, newState.showPictureModal)
        return newState;
    }
    
    if(action.type === actions.GET_PROFILE_SUCCESS) {
        newState.loadedProfile = Object.assign({}, action.data);
        newState.postData = newState.loadedProfile.posts.slice();
        return newState;
    }
    
    if(action.type === actions.TOGGLE_EDIT_COMMENT) {
        newState.editComment[action.commentID] = action.toggle;
        newState.editComment = Object.assign({}, newState.editComment)
        return newState;
    }
    
    if(action.type === actions.TOGGLE_MODAL) {
        newState.showModal.toggle = action.toggle;
        newState.showModal.postID = action.postID;
        newState.showModal = Object.assign({}, newState.showModal);
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
    
    if(action.type === actions.COMMENT_EDIT_SUCCESS) {
        var newChange = [];
        var returnIndex = newState.postData.findIndex(function(post) {
            console.log(post._id, 'postid', action.postID)
            return post._id == action.postID;
        });
        console.log(returnIndex, 'returnindex')
        if(returnIndex > -1) {
            newChange = newState.postData.slice();
            var returnComment = newState.postData[returnIndex].comments.findIndex(function(comment) {
                return comment._id == action.commentID;
            })
            console.log(returnComment, 'return comment')
            if(returnComment > -1) {
                console.log(newState.postData, 'new state')
                console.log(newState.postData[returnIndex], 'new index')
                newChange[returnIndex] = Object.assign({}, newState.postData[returnIndex]);
                console.log(newChange, ' newchange array 1')
                newChange[returnIndex].comments = newState.postData[returnIndex].comments.slice();
                console.log(newChange, ' newchange array 2')
                newChange[returnIndex].comments[returnComment] = Object.assign({}, newState.postData[returnIndex].comments[returnComment])
                console.log(newChange, ' newchange array 3')
                newChange[returnIndex].comments[returnComment].comment = action.data.comment;
                console.log(newChange, ' newchange array 4')
                newState.postData = newChange.slice()
                console.log(newChange, ' newchange array 5')
                return newState;
            }
        }
        return newState;
    }
    
    if(action.type === actions.COMMENT_DELETE_SUCCESS) {
        var newChange = [];
        var returnIndex = newState.postData.findIndex(function(post) {
            console.log(post._id, 'postid', action.postID)
            return post._id == action.postID;
        });
        console.log(returnIndex, 'returnindex')
        if(returnIndex > -1) {
            newChange = newState.postData.slice();
            var returnComment = newState.postData[returnIndex].comments.findIndex(function(comment) {
                return comment._id == action.commentID;
            })
            console.log(returnComment, 'return comment')
            if(returnComment > -1) {
                console.log(newState.postData, 'new state')
                console.log(newState.postData[returnIndex], 'new index')
                newChange[returnIndex] = Object.assign({}, newState.postData[returnIndex]);
                console.log(newChange, ' newchange array 1')
                newChange[returnIndex].comments = newState.postData[returnIndex].comments.slice();
                console.log(newChange, ' newchange array 2')
                newChange[returnIndex].comments.splice(returnComment, 1);
                console.log(newChange, ' newchange array 4')
                newState.postData = newChange.slice()
                console.log(newChange, ' newchange array 5')
                return newState;
            }
        }
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
        newState.singlePost = action.data.data;
        newState.singlePost = Object.assign({}, newState.singlePost);
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
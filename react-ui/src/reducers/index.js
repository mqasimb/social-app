const react = require('react');
const actions = require('../actions/index');

var initialState = {
        auth: {authenticated: false, user: {}},
        newPost: {content: '', image: null},
        postData: [],
        singlePost: {},
        postLoading: true,
        isEdit: false,
        commentsInput: {},
        uploadedFile: '',
        uploadedFileCloudinaryUrl: '',
        flashMessages: {},
        showModal: {toggle: false, postID: null},
        showPictureModal: {toggle: false, username: null},
        editComment: {},
        editPost: {},
        loadedProfile: {},
        mainProfile: {},
        chatMessages: {},
        uploadedProfilePic: '',
        uploadedProfilePicCloudinaryUrl: '',
        profilePosts: [],
        changeAboutMe: false,
        userSearchResults: [],
        friendsOnline: [],
        chatsOpen: {},
        chatImagesUpload: {},
        chatImagesUploadUrl: {}
    };

var appReducer = function(state = initialState, action) {
    var newState = Object.assign({}, state);

    if(action.type === actions.LIKE_GAME) {
        return {...state, mainProfile: {...state.mainProfile, favoriteGames: [...action.data.favoriteGames]}}
    }

    if(action.type === actions.CLOSE_CHAT) {
        delete newState.chatsOpen[action.username];
        newState.chatsOpen = Object.assign({}, newState.chatsOpen);
        return newState;
    }

    if(action.type === actions.DENIED_FRIEND_REQUEST) {
        var firstIndex = state.mainProfile.outgoingRequests.findIndex((request) => request.username == action.username)
        if(firstIndex > -1) {
            return {...state, 
                mainProfile: {...state.mainProfile, 
                    outgoingRequests: [...state.mainProfile.outgoingRequests.slice(0, firstIndex), ...state.mainProfile.outgoingRequests.slice(firstIndex + 1)]}}
        }
    }

    if(action.type === actions.CANCELLED_FRIEND_REQUEST) {
        var firstIndex = state.mainProfile.incomingRequests.findIndex((request) => request.username == action.username)
        if(firstIndex > -1) {
            return {...state, 
                mainProfile: {...state.mainProfile, 
                    incomingRequests: [...state.mainProfile.incomingRequests.slice(0, firstIndex), ...state.mainProfile.incomingRequests.slice(firstIndex + 1)]}}
        }
    }

    if(action.type === actions.RECEIVED_FRIEND_REQUEST) {
        return {...state, 
            mainProfile: {...state.mainProfile, 
                incomingRequests: [...state.mainProfile.incomingRequests, {username: action.username, ProfilePicture: action.ProfilePicture}]}}
    }

    if(action.type === actions.ACCEPTED_FRIEND_REQUEST) {
        var firstIndex = state.mainProfile.outgoingRequests.findIndex((request) => request.username == action.username)
        if(firstIndex > -1) {
            return {...state, 
                mainProfile: {...state.mainProfile, 
                    outgoingRequests: [...state.mainProfile.outgoingRequests.slice(0, firstIndex), ...state.mainProfile.outgoingRequests.slice(firstIndex + 1)], 
                    Friends: [...state.mainProfile.Friends, {username: action.username}]}}
        }
    }

    if(action.type === actions.REMOVED_AS_FRIEND) {
        var firstIndex = newState.mainProfile.Friends.findIndex((request) => request.username == action.username)
        if(firstIndex > -1) {
            newState.mainProfile.Friends.splice(firstIndex, 1);
            newState.mainProfile.Friends = newState.mainProfile.Friends.slice();
            newState.mainProfile = Object.assign({}, newState.mainProfile);  
        }
        var friendOnlineIndex = newState.friendsOnline.findIndex(function(friend) {
            return friend.username == action.username;
        })
        if(friendOnlineIndex > -1) {
            newState.friendsOnline.splice(friendOnlineIndex, 1);
            newState.friendsOnline = newState.friendsOnline.slice(); 
        }
        return newState;
    }

    if(action.type === actions.USER_CONNECT) {
        var firstIndex = state.mainProfile.Friends.findIndex((friend) => friend.username == action.username)
        if(firstIndex > -1) {
            state = {...state, 
                mainProfile: {...state.mainProfile, 
                    Friends: [...state.mainProfile.Friends.slice(0, firstIndex), 
                        {...state.mainProfile.Friends[firstIndex], onlineStatus: true}, 
                        ...state.mainProfile.Friends.slice(firstIndex + 1)]}}
            return {...state, 
                friendsOnline: state.mainProfile.Friends.filter((friend) => friend.onlineStatus == true)}
        }
    }

    if(action.type === actions.USER_DISCONNECT) {
        var firstIndex = newState.mainProfile.Friends.findIndex((friend) => friend.username == action.username)
        if(firstIndex > -1) {
            state = {...state, 
                mainProfile: {...state.mainProfile, 
                    Friends: [...state.mainProfile.Friends.slice(0, firstIndex), 
                        {...state.mainProfile.Friends[firstIndex], onlineStatus: false}, 
                        ...state.mainProfile.Friends.slice(firstIndex + 1)]}}
            return {...state, 
                friendsOnline: state.mainProfile.Friends.filter((friend) => friend.onlineStatus == true)}
        }
    }

    if(action.type === actions.UPLOAD_MESSAGE_IMAGE) {
        return {...state, chatImagesUpload: {...state.chatImagesUpload, [action.friendUsername]: action.files}}
    }
    
    if(action.type === actions.SET_MESSAGE_IMAGE_CLOUDINARY_URL) {
        return {...state, chatImagesUploadUrl: {...state.chatImagesUploadUrl, [action.friendUsername]: action.url}}
    }

    if(action.type === actions.SAVE_MESSAGES_TO_PROFILE) {
        var firstIndex = newState.mainProfile.messages.findIndex((friend) => friend.friend === action.friend)
        if(firstIndex > -1) {
            newState.mainProfile.messages[firstIndex].messages.push(action.data);
            newState.mainProfile.messages[firstIndex].messages = newState.mainProfile.messages[firstIndex].messages.slice();
            newState.mainProfile.messages[firstIndex] = Object.assign({}, newState.mainProfile.messages[firstIndex]);
            newState.mainProfile.messages = newState.mainProfile.messages.slice();
            newState.mainProfile = Object.assign({}, newState.mainProfile);
        }
        else {
            newState.mainProfile.messages.push({friend: action.friend, messages: [action.data]});
            newState.mainProfile.messages = newState.mainProfile.messages.slice();
            newState.mainProfile = Object.assign({}, newState.mainProfile);
        }
        return newState;
    }

    if(action.type === actions.CHAT_SUBMIT) {
        if(newState.chatImagesUploadUrl[action.data.friend]) {
            newState.chatImagesUploadUrl[action.data.friend] = null;
            newState.chatImagesUploadUrl = Object.assign({}, newState.chatImagesUploadUrl)
        }
        if(newState.chatMessages[action.data.friend] === undefined) {
            newState.chatMessages[action.data.friend] = [];
        }
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
    
    if(action.type === actions.LOAD_OLDER_MESSAGES) {
        var firstIndex = state.mainProfile.messages.findIndex((friend) => friend.friend === action.friend)
        if(firstIndex > -1) {
            return {...state, 
                chatMessages: {...state.chatMessages, 
                    [action.friend]: [...state.mainProfile.messages[firstIndex].messages]}}
        }
    }

    if(action.type === actions.MESSAGE_RECEIVED) {
        if(state.chatMessages[action.data.username] === undefined) {
            state = {...state, chatMessages: {...state.chatMessages, [action.data.username]: []}}
        }
        return {...state, chatMessages: {...state.chatMessages, [action.data.username]: [...state.chatMessages[action.data.username], action.data]}}
    }

    if(action.type === actions.GET_SEARCH_USERNAMES_SUCCESS) {
        newState.userSearchResults = action.data;
        newState.userSearchResults = newState.userSearchResults.slice();
        return newState;
    }

    if(action.type === actions.SEND_FRIEND_REQUEST_SUCCESFUL) {
        newState.mainProfile.outgoingRequests.push({username: action.username, ProfilePicture: action.ProfilePicture});
        newState.mainProfile.outgoingRequests = newState.mainProfile.outgoingRequests.slice();
        newState.mainProfile = Object.assign({}, newState.mainProfile);
        return newState;
    }
    
    if(action.type === actions.CANCEL_FRIEND_REQUEST_SUCCESFUL) {
        var firstIndex = newState.mainProfile.outgoingRequests.findIndex(function(request) {
            return request.username == action.username;
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
            return request.username == action.username;
        })
        if(firstIndex > -1) {
            newState.mainProfile.incomingRequests.splice(firstIndex, 1);
            newState.mainProfile.incomingRequests = newState.mainProfile.incomingRequests.slice();
            newState.mainProfile.Friends.push({username: action.username});
            newState.mainProfile.Friends = newState.mainProfile.Friends.slice();
            newState.mainProfile = Object.assign({}, newState.mainProfile);  
        }
        return newState;
    }
    
    if(action.type === actions.REMOVE_FRIEND_REQUEST_SUCCESFUL) {
        var firstIndex = newState.mainProfile.Friends.findIndex(function(request) {
            return request.username == action.username;
        })
        if(firstIndex > -1) {
            newState.mainProfile.Friends.splice(firstIndex, 1);
            newState.mainProfile.Friends = newState.mainProfile.Friends.slice();
            newState.mainProfile = Object.assign({}, newState.mainProfile);  
        }
        var friendOnlineIndex = newState.friendsOnline.findIndex(function(friend) {
            return friend.username == action.username;
        })
        if(friendOnlineIndex > -1) {
            newState.friendsOnline.splice(friendOnlineIndex, 1);
            newState.friendsOnline = newState.friendsOnline.slice(); 
        }
        return newState;
    }
    
    if(action.type === actions.DENY_FRIEND_REQUEST_SUCCESFUL) {
        var firstIndex = newState.mainProfile.incomingRequests.findIndex(function(request) {
            return request.username == action.username;
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
        newState.friendsOnline = action.data.Friends.filter(function(friend) {
            return friend.onlineStatus == true;
        })
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

    if(action.type === actions.COMMENT_SUBMIT_SUCCESS) {
        var firstIndex = newState.postData.findIndex(function(post) {
            return post._id == action.postID;
        });
        var commentIndex = action.serverData.comments.length-1;
        if(firstIndex > -1) {
            newState.postData[firstIndex].comments.push({_id:action.serverData.comments[commentIndex]._id, comment: action.data.comment, username: newState.mainProfile.username, date: action.serverData.comments[commentIndex].date, post: action.postID, profile: newState.mainProfile})
            newState.postData[firstIndex].comments = newState.postData[firstIndex].comments.slice();
            newState.postData[firstIndex] = Object.assign({}, newState.postData[firstIndex]);
            newState.postData = newState.postData.slice();
            return newState;
            }
        return newState;
    }

    if(action.type === actions.LIKE_STATUS_CHANGE_SUCCESSFUL) {
        var firstIndex = newState.postData.findIndex(function(post) {
            return post._id == action.postID;
        });
        if(firstIndex > -1) {
            var returnIndex = newState.postData[firstIndex].likes.findIndex(function(user) { 
                return user.username == action.userID;
            })
            if(returnIndex > -1) {
                //remove like
                newState.postData[firstIndex].likes.splice(returnIndex, 1);
            }
            else {
                //add like
                newState.postData[firstIndex].likes.push({username: action.userID, like: true})
            }
            newState.postData[firstIndex].likes = newState.postData[firstIndex].likes.slice();
            newState.postData[firstIndex] = Object.assign({}, newState.postData[firstIndex]);
            newState.postData = newState.postData.slice();
            return newState;
            }
        return newState;
    }

    if(action.type === actions.TOGGLE_EDIT_POST) {
        newState.editPost[action.postID] = action.toggle;
        newState.editPost = Object.assign({}, newState.editPost)
        return newState;
    }

    if(action.type === actions.EDIT_POST_SUCCESSFUL) {
        var firstIndex = newState.postData.findIndex(function(post) {
            return post._id == action.postID;
        });
        if(firstIndex > -1) {
            newState.postData = newState.postData.slice();
            newState.postData[firstIndex] = Object.assign({}, newState.postData[firstIndex]);
            newState.postData[firstIndex].content = action.values.content;
            return newState;
            }
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
        var returnIndex = newState.postData.findIndex(function(post) {
            return post._id == action.postID;
        });
        if(returnIndex > -1) {
            var returnComment = newState.postData[returnIndex].comments.findIndex(function(comment) {
                return comment._id == action.commentID;
            })
            if(returnComment > -1) {
                newState.postData[returnIndex].comments[returnComment].comment = action.data.comment;
                newState.postData[returnIndex].comments = newState.postData[returnIndex].comments.slice();
                newState.postData = newState.postData.slice();
                return newState;
            }
        }
        return newState;
    }
    
    if(action.type === actions.COMMENT_DELETE_SUCCESS) {
        var returnIndex = newState.postData.findIndex(function(post) {
            return post._id == action.postID;
        });
        if(returnIndex > -1) {
            var returnComment = newState.postData[returnIndex].comments.findIndex(function(comment) {
                return comment._id == action.commentID;
            })
            if(returnComment > -1) {
                newState.postData[returnIndex].comments.splice(returnComment, 1);
                newState.postData[returnIndex].comments = newState.postData[returnIndex].comments.slice();
                newState.postData = newState.postData.slice();
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
        newState.newPost = Object.assign({}, newState.newPost);
        newState.uploadedFileCloudinaryUrl = action.url;
        newState.newPost.image = action.url;
        return newState;
    }
    
    if(action.type === actions.EDIT_INPUT) {
        newChange = {};
        newChange[action.inputName] = action.inputValue;
        newState.editInput = Object.assign({}, newChange);
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
        newState.newPost = Object.assign({}, newState.newPost);
        newState.newPost[action.inputName] = action.inputValue;
        return newState;
    }
    
    if(action.type === actions.USER_LOGGED_IN) {
        newState.auth = Object.assign({}, newState.auth);
        newState.auth.authenticated = true;
        newState.auth.user = Object.assign({}, action.user);
        return newState;
    }
    
    if(action.type === actions.USER_LOGGED_OUT) {
        newState = Object.assign({}, initialState)
        newState.chatsOpen = Object.assign({});
        return newState;
    }
    
    return state;
}

module.exports = appReducer;
exports.initialState = initialState;
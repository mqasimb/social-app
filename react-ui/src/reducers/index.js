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
        return {...state, chatsOpen: {...state.chatsOpen}};
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
                    Friends: [...state.mainProfile.Friends, state.mainProfile.outgoingRequests[firstIndex]],
                    outgoingRequests: [...state.mainProfile.outgoingRequests.slice(0, firstIndex), ...state.mainProfile.outgoingRequests.slice(firstIndex + 1)]},
                loadedProfile: {...state.loadedProfile,
                    Friends: [...state.loadedProfile.Friends, state.mainProfile.outgoingRequests[firstIndex]]}}
        }
    }

    if(action.type === actions.REMOVED_AS_FRIEND) {
        var friendOnlineIndex = state.friendsOnline.findIndex((friend) => friend.username == action.username)
        if(friendOnlineIndex > -1) {
            state = {...state, friendsOnline: [...state.friendsOnline.slice(0, friendOnlineIndex), ...state.friendsOnline.slice(friendOnlineIndex + 1)]}
        }
        var firstIndex = state.mainProfile.Friends.findIndex((request) => request.username == action.username)
        var loadedProfileIndex = state.loadedProfile.Friends.findIndex((request) => request.username == action.username)
        if(firstIndex > -1) {
            return {...state, 
                mainProfile: {...state.mainProfile, 
                    Friends: [...state.mainProfile.Friends.slice(0, firstIndex), ...state.mainProfile.Friends.slice(firstIndex + 1)]},
                    loadedProfile: {...state.loadedProfile, 
                    Friends: [...state.loadedProfile.Friends.slice(0, loadedProfileIndex), ...state.loadedProfile.Friends.slice(loadedProfileIndex + 1)]}}
        }
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

    if(action.type === actions.SEND_FRIEND_REQUEST_SUCCESFUL) {
        newState.mainProfile.outgoingRequests.push({username: action.username, ProfilePicture: action.ProfilePicture});
        newState.mainProfile.outgoingRequests = newState.mainProfile.outgoingRequests.slice();
        newState.mainProfile = Object.assign({}, newState.mainProfile);
        return newState;
    }
    
    if(action.type === actions.CANCEL_FRIEND_REQUEST_SUCCESFUL) {
        var firstIndex = state.mainProfile.outgoingRequests.findIndex((request) => request.username == action.username)
        if(firstIndex > -1) {
            return {...state, 
                mainProfile: {...state.mainProfile, 
                    outgoingRequests: [...state.mainProfile.outgoingRequests.slice(0, firstIndex), ...state.mainProfile.outgoingRequests.slice(firstIndex + 1)]}}
        }
    }
      
    if(action.type === actions.CONFIRM_FRIEND_REQUEST_SUCCESFUL) {
        var firstIndex = state.mainProfile.incomingRequests.findIndex((request) => request.username == action.username)
        if(firstIndex > -1) {
            return {...state, 
                mainProfile: {...state.mainProfile,
                    Friends: [...state.mainProfile.Friends, state.mainProfile.incomingRequests[firstIndex]],
                    incomingRequests: [...state.mainProfile.incomingRequests.slice(0, firstIndex), ...state.mainProfile.incomingRequests.slice(firstIndex + 1)]},
                loadedProfile: {...state.loadedProfile,
                    Friends: [...state.loadedProfile.Friends, state.mainProfile.incomingRequests[firstIndex]]}}
        }
    }
    
    if(action.type === actions.REMOVE_FRIEND_REQUEST_SUCCESFUL) {
        var friendOnlineIndex = state.friendsOnline.findIndex((friend) => friend.username == action.username)
        if(friendOnlineIndex > -1) {
            state = {...state, friendsOnline: [...state.friendsOnline.slice(0, friendOnlineIndex), ...state.friendsOnline.slice(friendOnlineIndex + 1)]}
        }
        var firstIndex = state.mainProfile.Friends.findIndex((request) => request.username == action.username)
        var loadedProfileIndex = state.loadedProfile.Friends.findIndex((request) => request.username == action.username)
        if(firstIndex > -1) {
            return {...state, 
                mainProfile: {...state.mainProfile, 
                    Friends: [...state.mainProfile.Friends.slice(0, firstIndex), ...state.mainProfile.Friends.slice(firstIndex + 1)]},
                    loadedProfile: {...state.loadedProfile, 
                    Friends: [...state.loadedProfile.Friends.slice(0, loadedProfileIndex), ...state.loadedProfile.Friends.slice(loadedProfileIndex + 1)]}}
        }
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
        return {...state, 
            mainProfile: {...action.data}, 
            friendsOnline: action.data.Friends.filter((friend) => friend.onlineStatus == true)}
    }
    
    if(action.type === actions.POST_PROFILE_ABOUT_ME_SUCCESFUL) {
        return {...state,
            loadedProfile: {...state.loadedProfile, AboutMe: action.aboutMe.aboutMe}}
    }
     
    if(action.type === actions.CHANGE_ABOUT_ME) {
        return {...state,
            changeAboutMe: action.toggle}
    }
    
    if(action.type === actions.POST_PROFILE_PIC_SUCCESFUL) {
        return {...state,
            loadedProfile: {...state.loadedProfile, ProfilePicture: state.uploadedProfilePicCloudinaryUrl},
            uploadedProfilePic: '',
            uploadedProfilePicCloudinaryUrl: '',
            showPictureModal: {...state.showPictureModal, toggle: false, username: null}}
    }
    
    if(action.type === actions.UPLOAD_PROFILE_PIC) {
        return {...state,
            uploadedProfilePic: action.files}
    }
    
    if(action.type === actions.SET_PROFILE_PIC_CLOUDINARY_URL) {
        return {...state,
            uploadedProfilePicCloudinaryUrl: action.url}
    }
    
    if(action.type === actions.CHANGE_PICTURE_MODAL) {
        return {...state,
            showPictureModal: {...state.showPictureModal, 
                toggle: action.toggle, 
                username: action.username}}
    }
    
    if(action.type === actions.GET_PROFILE_SUCCESS) {
        return {...state,
            loadedProfile: {...action.data},
            postData: [...action.data.posts]}
    }
    
    if(action.type === actions.TOGGLE_EDIT_COMMENT) {
        return {...state,
            editComment: {...state.editComment, 
                [action.commentID]: action.toggle}}
    }

    if(action.type === actions.COMMENT_SUBMIT_SUCCESS) {
        var firstIndex = newState.postData.findIndex((post) => post._id == action.postID)
        var commentIndex = action.serverData.comments.length-1;
        if(firstIndex > -1) {
            return {...state, 
                postData: [...state.postData.slice(0, firstIndex), 
                {...state.postData[firstIndex], comments: [...state.postData[firstIndex].comments, {_id:action.serverData.comments[commentIndex]._id, comment: action.data.comment, username: newState.mainProfile.username, date: action.serverData.comments[commentIndex].date, post: action.postID, profile: newState.mainProfile}]},
                ...state.postData.slice(firstIndex + 1)]}
            }
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
        return {...state, 
            editPost: {...state.editPost, [action.postID]: action.toggle}}
    }

    if(action.type === actions.EDIT_POST_SUCCESSFUL) {
        var firstIndex = newState.postData.findIndex((post) => post._id == action.postID)
        if(firstIndex > -1) {
            return {...state, 
                postData: [...state.postData.slice(0, firstIndex), 
                {...state.postData[firstIndex], content: action.values.content},
                ...state.postData.slice(firstIndex + 1)]}
            }
    }
    
    if(action.type === actions.TOGGLE_MODAL) {
        return {...state, 
            showModal: {...state.showModal, toggle: action.toggle, postID: action.postID}}
    }
    
    if(action.type === actions.POST_SUCCESSFUL) {
        return {...state, 
            newPost: {...state.newPost, content: '', image: null},
            uploadedFile: '',
            uploadedFileCloudinaryUrl: ''}
    }
    
    if(action.type === actions.COMMENT_EDIT_SUCCESS) {
        var returnIndex = state.postData.findIndex((post) => post._id == action.postID)
        if(returnIndex > -1) {
            var returnComment = newState.postData[returnIndex].comments.findIndex((comment) => comment._id == action.commentID)
            if(returnComment > -1) {
                return {...state, 
                    postData: [...state.postData.slice(0, returnIndex), 
                    {...state.postData[returnIndex], 
                        comments: [...state.postData[returnIndex].comments.slice(0, returnComment), 
                        {...state.postData[returnIndex].comments[returnComment], comment: action.data.comment},
                        ...state.postData[returnIndex].comments.slice(returnComment + 1)]},
                    ...state.postData.slice(returnIndex + 1)]}
            }
        }
    }
    
    if(action.type === actions.COMMENT_DELETE_SUCCESS) {
        var returnIndex = state.postData.findIndex((post) => post._id == action.postID)
        if(returnIndex > -1) {
            var returnComment = newState.postData[returnIndex].comments.findIndex((comment) => comment._id == action.commentID)
            if(returnComment > -1) {
                return {...state, 
                    postData: [...state.postData.slice(0, returnIndex), 
                    {...state.postData[returnIndex], 
                        comments: [...state.postData[returnIndex].comments.slice(0, returnComment), ...state.postData[returnIndex].comments.slice(returnComment + 1)]},
                    ...state.postData.slice(returnIndex + 1)]}
            }
        }
    }
    
    if(action.type === actions.UPLOAD_FILE) {
        return {...state, uploadedFile: action.files}
    }
    
    if(action.type === actions.SET_UPLOAD_FILE_CLOUDINARY_URL) {
        return {...state, 
            uploadedFileCloudinaryUrl: action.url, 
            newPost: {...state.newPost, image: action.url}}
    }
    
    if(action.type === actions.EDIT_INPUT) {
        return {...state, 
            editInput: {...state.editInput, [action.inputName]: action.inputValue}}
    }
    
    if(action.type === actions.EDIT_POST_ENABLE) {
        return {...state,
            isEdit: true}
    }
    
    if(action.type === actions.EDIT_POST_DISABLE) {
        return {...state,
            isEdit: false}
    }
    
    if(action.type === actions.SINGLE_POST_FETCH_SUCCESSFUL) {
        return {...state,
            singlePost: {...action.data.data},
            postLoading: false}
    }
    
    if(action.type === actions.DISMOUNT_SINGLE_POST) {
         return {...state,
            singlePost: {...{}},
            postLoading: true,
            isEdit: false}
    }
    
    if(action.type === actions.POST_FETCH_SUCCESSFUL) {
        return {...state,
            postData: [...action.data.data]}
    }
    
    if(action.type === actions.UPDATE_POST_INPUT) {
        return {...state,
            newPost: {...state.newPost, [action.inputName]: action.inputValue}}
    }
    
    if(action.type === actions.USER_LOGGED_IN) {
        return {...state,
            auth: {...state.auth, authenticated: true, user: {...action.user}}}
    }
    
    if(action.type === actions.USER_LOGGED_OUT) {
        return {...initialState, chatsOpen: {...{}}}
    }
    
    return state;
}

module.exports = appReducer;
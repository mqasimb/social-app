const reducer = require('../index')
const actions = require('../../actions/index');
const { initialState } = require('../index')

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
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
        chatsOpen: {},
        chatImagesUpload: {},
        chatImagesUploadUrl: {}
    })
  })

  it('should handle DENIED_FRIEND_REQUEST', () => {
    expect(reducer({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {outgoingRequests: [{username: 'test1'}, {username: 'TestUser'}]},
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
    }, {
        type: actions.DENIED_FRIEND_REQUEST,
        username: 'TestUser'
    })).toEqual({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {outgoingRequests: [{username: 'test1'}]},
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
    })
  })

  it('should handle CANCEL_FRIEND_REQUEST_SUCCESFUL', () => {
    expect(reducer({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {outgoingRequests: [{username: 'test1'}, {username: 'TestUser'}]},
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
    }, {
        type: actions.CANCEL_FRIEND_REQUEST_SUCCESFUL,
        username: 'TestUser'
    })).toEqual({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {outgoingRequests: [{username: 'test1'}]},
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
    })
  })

  it('should handle DENY_FRIEND_REQUEST_SUCCESFUL', () => {
    expect(reducer({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {incomingRequests: [{username: 'test1'}, {username: 'TestUser'}]},
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
    }, {
        type: actions.DENY_FRIEND_REQUEST_SUCCESFUL,
        username: 'TestUser'
    })).toEqual({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {incomingRequests: [{username: 'test1'}]},
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
    })
  })

  it('should handle RECEIVED_FRIEND_REQUEST', () => {
    expect(reducer({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {incomingRequests: [{username: 'test1'}]},
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
    }, {
        type: actions.RECEIVED_FRIEND_REQUEST,
        username: 'TestUser',
        ProfilePicture: 'abc.jpg'
    })).toEqual({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {incomingRequests: [{username: 'test1'}, {username: 'TestUser', ProfilePicture: 'abc.jpg'}]},
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
    })
  })

  it('should handle ACCEPTED_FRIEND_REQUEST', () => {
    expect(reducer({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {Friends: [], outgoingRequests: [{username: 'test1'}, {username: 'TestUser1'}]},
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
    }, {
        type: actions.ACCEPTED_FRIEND_REQUEST,
        username: 'TestUser1'
    })).toEqual({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {Friends: [{username: 'TestUser1'}], outgoingRequests: [{username: 'test1'}]},
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
    })
  })

  it('should handle CONFIRM_FRIEND_REQUEST_SUCCESFUL', () => {
    expect(reducer({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {Friends: [], incomingRequests: [{username: 'test1'}, {username: 'TestUser1'}]},
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
    }, {
        type: actions.CONFIRM_FRIEND_REQUEST_SUCCESFUL,
        username: 'TestUser1'
    })).toEqual({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {Friends: [{username: 'TestUser1'}], incomingRequests: [{username: 'test1'}]},
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
    })
  })

  it('should handle REMOVED_AS_FRIEND', () => {
    expect(reducer({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {Friends: [{username: 'test1'}, {username: 'TestUser'}]},
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
    }, {
        type: actions.REMOVED_AS_FRIEND,
        username: 'TestUser'
    })).toEqual({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {Friends: [{username: 'test1'}]},
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
    })
  })

  it('should handle REMOVE_FRIEND_REQUEST_SUCCESFUL', () => {
    expect(reducer({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {Friends: [{username: 'test1'}, {username: 'TestUser'}]},
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
    }, {
        type: actions.REMOVE_FRIEND_REQUEST_SUCCESFUL,
        username: 'TestUser'
    })).toEqual({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {Friends: [{username: 'test1'}]},
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
    })
  })

  it('should handle SEND_FRIEND_REQUEST_SUCCESFUL', () => {
    expect(reducer({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {outgoingRequests: [{username: 'test1'}]},
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
    }, {
        type: actions.SEND_FRIEND_REQUEST_SUCCESFUL,
        username: 'TestUser'
    })).toEqual({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
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
        mainProfile: {outgoingRequests: [{username: 'test1'}, {username: 'TestUser'}]},
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
    })
  })
})
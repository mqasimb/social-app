const reducer = require('../index')
const actions = require('../../actions/index');

describe('reducer chat', () => {
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

  it('should handle TOGGLE_EDIT_COMMENT', () => {
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
    }, {
        type: actions.TOGGLE_EDIT_COMMENT,
        commentID: '123',
        toggle: true
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
        editComment: {123: true},
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

  it('should handle TOGGLE_MODAL', () => {
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
    }, {
        type: actions.TOGGLE_MODAL,
        postID: '123',
        toggle: true
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
        showModal: {toggle: true, postID: '123'},
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

  it('should handle POST_SUCCESSFUL', () => {
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
    }, {
        type: actions.POST_SUCCESSFUL,
        postID: '123',
        toggle: true
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

  it('should handle COMMENT_EDIT_SUCCESS', () => {
    expect(reducer({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
        newPost: {content: '', image: null},
        postData: [{'_id': '123', content: '1', comments: [{'_id': '234', comment: '1'}, {'_id': '345', comment: '5'}]}],
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
    }, {
        type: actions.COMMENT_EDIT_SUCCESS,
        postID: '123',
        commentID: '234',
        data: {comment: 'abc'}
    })).toEqual({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
        newPost: {content: '', image: null},
        postData: [{'_id': '123', content: '1', comments: [{'_id': '234', comment: 'abc'}, {'_id': '345', comment: '5'}]}],
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

  it('should handle COMMENT_DELETE_SUCCESS', () => {
    expect(reducer({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
        newPost: {content: '', image: null},
        postData: [{'_id': '123', content: '1', comments: [{'_id': '234', comment: '1'}, {'_id': '345', comment: '5'}]}],
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
    }, {
        type: actions.COMMENT_DELETE_SUCCESS,
        postID: '123',
        commentID: '234'
    })).toEqual({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
        newPost: {content: '', image: null},
        postData: [{'_id': '123', content: '1', comments: [{'_id': '345', comment: '5'}]}],
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

  it('should handle UPLOAD_FILE', () => {
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
    }, {
        type: actions.UPLOAD_FILE,
        files: '123.jpg'
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
        uploadedFile: '123.jpg',
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

  it('should handle SET_UPLOAD_FILE_CLOUDINARY_URL', () => {
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
    }, {
        type: actions.SET_UPLOAD_FILE_CLOUDINARY_URL,
        url: 'https://google.com/123.jpg'
    })).toEqual({
        loginInput: {username: '', password: ''},
        registerInput: {username: '', email: '', password: '', 'confirm-password': ''},
        auth: {authenticated: true, user: {username: 'TestUser'}},
        newPost: {content: '', image: 'https://google.com/123.jpg'},
        postData: [],
        singlePost: {},
        postLoading: true,
        isEdit: false,
        editInput: {content: ''},
        commentsInput: {},
        uploadedFile: '',
        uploadedFileCloudinaryUrl: 'https://google.com/123.jpg',
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

})
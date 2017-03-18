const actions = require('../index');

describe('friend system related actions', () => {
  it('should create an action when a post is submitted successfully', () => {
    const expectedAction = {
      type: actions.POST_SUCCESSFUL,
    }
    expect(actions.postSuccesful()).toEqual(expectedAction)
  })

  it('should create an action when posts are fetched succesfully', () => {
    const testData = {}
    const expectedAction = {
      type: actions.POST_FETCH_SUCCESSFUL,
      data: testData
    }
    expect(actions.postFetchSuccessful(testData)).toEqual(expectedAction)
  })

  it('should create an action when a likes status changes', () => {
    const testData = {}
    const expectedAction = {
      type: actions.LIKE_STATUS_CHANGE_SUCCESSFUL,
      data: testData
    }
    expect(actions.likeStatusChangeSuccessful(testData)).toEqual(expectedAction)
  })

  it('should create an action when a comment is submitted successfully', () => {
    const testInput = 'test'
    const expectedAction = {
      type: actions.COMMENT_SUBMIT_SUCCESS,
      inputName: testInput
    }
    expect(actions.commentSubmitSuccess(testInput)).toEqual(expectedAction)
  })

  it('should create an action when a comment is editted successfully', () => {
    const testData = {}
    const testPostID = 'postID'
    const testCommentID = 'commentID'
    const expectedAction = {
      type: actions.COMMENT_EDIT_SUCCESS,
      postID: testPostID,
      commentID: testCommentID,
      data: testData
    }
    expect(actions.commentEditSuccess(testPostID, testCommentID, testData)).toEqual(expectedAction)
  })

  it('should create an action when a comment is editted successfully', () => {
    const testToggle = true
    const testCommentID = 'commentID'
    const expectedAction = {
      type: actions.TOGGLE_EDIT_COMMENT,
      commentID: testCommentID,
      toggle: testToggle
    }
    expect(actions.toggleEditComment(testCommentID, testToggle)).toEqual(expectedAction)
  })

  it('should create an action when a comment is deleted successfully', () => {
    const testPostID = 'postID'
    const testCommentID = 'commentID'
    const expectedAction = {
      type: actions.COMMENT_DELETE_SUCCESS,
      postID: testPostID,
      commentID: testCommentID
    }
    expect(actions.commentDeleteSuccess(testPostID, testCommentID)).toEqual(expectedAction)
  })

  it('should create an action when a cloudinary url is received through file upload', () => {
    const testUrl = 'https://testurl.com/'
    const expectedAction = {
      type: actions.SET_UPLOAD_FILE_CLOUDINARY_URL,
      url: testUrl
    }
    expect(actions.setCloudinaryURL(testUrl)).toEqual(expectedAction)
  })

  it('should create an action when a image is uploaded successfully', () => {
    const testFiles = 'files.jpg'
    const expectedAction = {
      type: actions.UPLOAD_FILE,
      files: testFiles
    }
    expect(actions.uploadFile(testFiles)).toEqual(expectedAction)
  })

  it('should create an action when a profile pic cloudinary url is received through file upload', () => {
    const testUrl = 'https://testurl.com/'
    const expectedAction = {
      type: actions.SET_PROFILE_PIC_CLOUDINARY_URL,
      url: testUrl
    }
    expect(actions.setProfilePicCloudinaryURL(testUrl)).toEqual(expectedAction)
  })

  it('should create an action when a profile picture is uploaded successfully', () => {
    const testFiles = 'files.jpg'
    const expectedAction = {
      type: actions.UPLOAD_PROFILE_PIC,
      files: testFiles
    }
    expect(actions.uploadProfilePic(testFiles)).toEqual(expectedAction)
  })

  it('should create an action when a button is clicked to toggle a modal', () => {
    const testPostID = 'files.jpg'
    const testToggle = true
    const expectedAction = {
      type: actions.TOGGLE_MODAL,
      postID: testPostID,
      toggle: testToggle
    }
    expect(actions.toggleModal(testPostID, testToggle)).toEqual(expectedAction)
  })

  it('should create an action when a profile is retrieved successfully', () => {
    const testData = {}
    const expectedAction = {
      type: actions.GET_PROFILE_SUCCESS,
      data: testData
    }
    expect(actions.getProfileSuccess(testData)).toEqual(expectedAction)
  })

  it('should create an action when a button is clicked to toggle a picture modal', () => {
    const testUsername = 'TestUsername'
    const testToggle = true
    const expectedAction = {
      type: actions.CHANGE_PICTURE_MODAL,
      username: testUsername,
      toggle: testToggle
    }
    expect(actions.changePictureModal(testUsername, testToggle)).toEqual(expectedAction)
  })

  it('should create an action when a profile picture is submitted successfully', () => {
    const expectedAction = {
      type: actions.POST_PROFILE_PIC_SUCCESFUL
    }
    expect(actions.postProfilePicSuccessful()).toEqual(expectedAction)
  })

  it('should create an action when a button is clicked to toggle change about me', () => {
    const testToggle = true
    const expectedAction = {
      type: actions.CHANGE_ABOUT_ME,
      toggle: testToggle
    }
    expect(actions.changeAboutMe(testToggle)).toEqual(expectedAction)
  })

  it('should create an action when about me is updated successfully', () => {
    const testAboutMe = 'About Me'
    const expectedAction = {
      type: actions.POST_PROFILE_ABOUT_ME_SUCCESFUL,
      aboutMe: testAboutMe
    }
    expect(actions.postProfileAboutMeSuccessful(testAboutMe)).toEqual(expectedAction)
  })

  it('should create an action when a logged in users profile is retrieved successfully', () => {
    const testData = {}
    const expectedAction = {
      type: actions.GET_MAIN_PROFILE_SUCCESS,
      data: testData
    }
    expect(actions.getMainProfileSuccess(testData)).toEqual(expectedAction)
  })
})
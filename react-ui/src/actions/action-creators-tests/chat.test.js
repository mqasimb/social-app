const actions = require('../index');

describe('chat related actions', () => {
  it('should create an action when a chat message is received', () => {
    const testMessage = {username: 'test', friend:'testfriend', message: 'testmessage'}
    const expectedAction = {
      type: actions.MESSAGE_RECEIVED,
      data: testMessage
    }
    expect(actions.messageReceived(testMessage)).toEqual(expectedAction)
  })

  it('should create an action when a friend comes online', () => {
    const testUsername = 'testUsername'
    const expectedAction = {
      type: actions.FRIEND_ONLINE,
      username: testUsername
    }
    expect(actions.friendOnline(testUsername)).toEqual(expectedAction)
  })

  it('should create an action when a chat is opened', () => {
    const testData = {username: 'test', friend:'testfriend', testChannel: 'testChannel'}
    const expectedAction = {
      type: actions.OPEN_CHAT,
      data: testData
    }
    expect(actions.openChat(testData)).toEqual(expectedAction)
  })

  it('should create an action when a chat is opened from receiving socket', () => {
    const testData = {username: 'test', friend:'testfriend', testChannel: 'testChannel'}
    const expectedAction = {
      type: actions.OPEN_CHAT_WITH_SOCKET,
      data: testData
    }
    expect(actions.openChatWithSocket(testData)).toEqual(expectedAction)
  })

  it('should create an action when a chat message is submitted', () => {
    const testMessage = {username: 'test', friend:'testfriend', message: 'testmessage'}
    const expectedAction = {
      type: actions.CHAT_SUBMIT,
      data: testMessage
    }
    expect(actions.chatSubmit(testMessage)).toEqual(expectedAction)
  })

  it('should create an action when a image is uploaded for chat', () => {
    const testFile = 'file.jpg'
    const testFriend = 'testFriend'
    const expectedAction = {
      type: actions.UPLOAD_MESSAGE_IMAGE,
      files: testFile,
      friendUsername: testFriend
    }
    expect(actions.uploadMessageImage(testFile, testFriend)).toEqual(expectedAction)
  })

  it('should create an action when a chat image is uploaded to cloudinary', () => {
    const testUrl = 'https://abcd.com/img.jpg'
    const testFriend = 'testFriend'
    const expectedAction = {
      type: actions.SET_MESSAGE_IMAGE_CLOUDINARY_URL,
      url: testUrl,
      friendUsername: testFriend
    }
    expect(actions.setMessageImageCloudinaryURL(testUrl, testFriend)).toEqual(expectedAction)
  })

  it('should create an action when a user connects to chat', () => {
    const testUsername = 'testUsername'
    const expectedAction = {
      type: actions.USER_CONNECT,
      username: testUsername
    }
    expect(actions.userConnect(testUsername)).toEqual(expectedAction)
  })

  it('should create an action when a user disconnects from chat', () => {
    const testUsername = 'testUsername'
    const expectedAction = {
      type: actions.USER_DISCONNECT,
      username: testUsername
    }
    expect(actions.userDisconnect(testUsername)).toEqual(expectedAction)
  })

  it('should create an action when a chat message is submitted to be saved to profile state', () => {
    const testFriend = 'testFriend'
    const testMessage = {username: 'test', friend:'testfriend', message: 'testmessage'}
    const expectedAction = {
      type: actions.SAVE_MESSAGES_TO_PROFILE,
      friend: testFriend,
      data: testMessage
    }
    expect(actions.saveMessagesToProfile(testFriend, testMessage)).toEqual(expectedAction)
  })

  it('should create an action when a user loads chat essage history', () => {
    const testFriend = 'testFriend'
    const expectedAction = {
      type: actions.LOAD_OLDER_MESSAGES,
      friend: testFriend
    }
    expect(actions.loadOlderMessages(testFriend)).toEqual(expectedAction)
  })
})
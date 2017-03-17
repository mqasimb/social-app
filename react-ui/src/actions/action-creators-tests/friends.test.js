const actions = require('../index');

describe('friend system related actions', () => {
  it('should create an action when a friend request is sent succesfully', () => {
    const testUsername = 'testUsername'
    const testProfilePicture = 'testPicture.jpg'
    const expectedAction = {
      type: actions.SEND_FRIEND_REQUEST_SUCCESFUL,
      username: testUsername,
      ProfilePicture: testProfilePicture
    }
    expect(actions.sendFriendRequestSuccesful(testUsername, testProfilePicture)).toEqual(expectedAction)
  })

  it('should create an action when a friend request is denied succesfully', () => {
    const testUsername = 'testUsername'
    const expectedAction = {
      type: actions.DENY_FRIEND_REQUEST_SUCCESFUL,
      username: testUsername
    }
    expect(actions.denyFriendRequestSuccesful(testUsername)).toEqual(expectedAction)
  })

  it('should create an action when a friend request is confirmed succesfully', () => {
    const testUsername = 'testUsername'
    const expectedAction = {
      type: actions.CONFIRM_FRIEND_REQUEST_SUCCESFUL,
      username: testUsername
    }
    expect(actions.confirmFriendRequestSuccesful(testUsername)).toEqual(expectedAction)
  })

  it('should create an action when a friend request is cancelled succesfully', () => {
    const testUsername = 'testUsername'
    const expectedAction = {
      type: actions.CANCEL_FRIEND_REQUEST_SUCCESFUL,
      username: testUsername
    }
    expect(actions.cancelFriendRequestSuccesful(testUsername)).toEqual(expectedAction)
  })

  it('should create an action when a friend request is removed succesfully', () => {
    const testUsername = 'testUsername'
    const expectedAction = {
      type: actions.REMOVE_FRIEND_REQUEST_SUCCESFUL,
      username: testUsername
    }
    expect(actions.removeFriendRequestSuccesful(testUsername)).toEqual(expectedAction)
  })

  it('should create an action when a friend request is received through socket', () => {
    const testUsername = 'testUsername'
    const testProfilePicture = 'testPicture.jpg'
    const expectedAction = {
      type: actions.RECEIVED_FRIEND_REQUEST,
      username: testUsername,
      ProfilePicture: testProfilePicture
    }
    expect(actions.receivedFriendRequest(testUsername, testProfilePicture)).toEqual(expectedAction)
  })

  it('should create an action when a friend request is denied and received through socket', () => {
    const testUsername = 'testUsername'
    const expectedAction = {
      type: actions.DENIED_FRIEND_REQUEST,
      username: testUsername
    }
    expect(actions.deniedFriendRequest(testUsername)).toEqual(expectedAction)
  })

  it('should create an action when a friend request is accepted and received through socket', () => {
    const testUsername = 'testUsername'
    const expectedAction = {
      type: actions.ACCEPTED_FRIEND_REQUEST,
      username: testUsername
    }
    expect(actions.acceptedFriendRequest(testUsername)).toEqual(expectedAction)
  })

  it('should create an action when a friend request is cancelled and received through socket', () => {
    const testUsername = 'testUsername'
    const expectedAction = {
      type: actions.CANCELLED_FRIEND_REQUEST,
      username: testUsername
    }
    expect(actions.cancelledFriendRequest(testUsername)).toEqual(expectedAction)
  })

  it('should create an action when a friend request is removed and received through socket', () => {
    const testUsername = 'testUsername'
    const expectedAction = {
      type: actions.REMOVED_AS_FRIEND,
      username: testUsername
    }
    expect(actions.removedAsFriend(testUsername)).toEqual(expectedAction)
  })
})
const actions = require('../index');

describe('actions', () => {
  it('should create an action when user has logged in', () => {
    const sampleJWTToken = 'hh235b2h352g5jhb6'
    const expectedAction = {
      type: actions.USER_LOGGED_IN,
      user: sampleJWTToken
    }
    expect(actions.userLoggedIn(sampleJWTToken)).toEqual(expectedAction)
  })

  it('should create an action when user has logged out', () => {
    const expectedAction = {
      type: actions.USER_LOGGED_OUT
    }
    expect(actions.userLoggedOut()).toEqual(expectedAction)
  })
  
  it('should create an action when user succesfully registered', () => {
    const expectedAction = {
      type: actions.REGISTRATION_SUCCESFUL
    }
    expect(actions.registrationSuccesful()).toEqual(expectedAction)
  })
})
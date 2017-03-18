const React = require('react');
const chai = require('chai');
const should = require('chai').should();
const TestUtils = require('react-addons-test-utils');
const { Provider } = require('react-redux');
const store = require('../store');
const UserListChat = require('./user-list-chat');

describe('UserListChat Component', function() {
    it('Renders Friend',  function() {
        var renderer = TestUtils.createRenderer();
        renderer.render(<Provider store={store}><UserListChat friend={'NewFriend'}></UserListChat></Provider>);
        var result = renderer.getRenderOutput();
        var content = result.props.friend;
        content.should.equal('NewFriend');
    });
});
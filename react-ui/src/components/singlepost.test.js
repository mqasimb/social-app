const React = require('react');
const chai = require('chai');
const should = require('chai').should();
const TestUtils = require('react-addons-test-utils');
const { Provider } = require('react-redux');
const store = require('../store');
var SinglePost = require('./singlepost');

describe('SinglePost Component', function() {
    it('Renders Post',  function() {
        var renderer = TestUtils.createRenderer();
        renderer.render(<Provider store={store}><SinglePost>Test</SinglePost></Provider>);
        var result = renderer.getRenderOutput();
        console.log('results', result)
        var content = result.props.children;
        content.should.equal('Test');
    });
});
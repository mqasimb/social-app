const React = require('react');
const chai = require('chai');
const should = require('chai').should();
const TestUtils = require('react-addons-test-utils');
const { Provider } = require('react-redux');
const store = require('../src/store');
var { App } = require('../src/components/app');

describe('App Component', function() {
    it('Renders Hello World',  function() {
        var renderer = TestUtils.createRenderer();
        renderer.render(<Provider store={store}><App>Hello World</App></Provider>);
        var result = renderer.getRenderOutput();
        var content = result.props.children;
        content.should.equal('Hello World');
    });
});
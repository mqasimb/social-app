const React = require('react');
const chai = require('chai');
const should = require('chai').should();
var TestUtils = require('react-addons-test-utils');

var App = require('../js/components/app');

describe('App Component', function() {
    it('Renders Hello World',  function() {
        var renderer = TestUtils.createRenderer();
        renderer.render(<App>Hello World</App>);
        var result = renderer.getRenderOutput();
        var content = result.props.children;
    });
});
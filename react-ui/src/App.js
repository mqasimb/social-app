import React, { Component } from 'react';
import logo from './logo.svg';

import './main.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from '@sketchpixy/rubix';

const router = require('react-router');
const Link = router.Link;
const actions = require('./actions/index');
const { connect } = require('react-redux');
const AsyncTypeahead = require('react-bootstrap-typeahead').AsyncTypeahead;
const Chat = require('./components/chat');

class App extends React.Component {
    userLogout(event) {
        event.preventDefault();
        this.props.dispatch(actions.logoutAction());
        router.browserHistory.push('/login');;
    }
    userLogin(event) {
        event.preventDefault();
        router.browserHistory.push('/login');;
    }
    userRegister(event) {
        event.preventDefault();
        router.browserHistory.push('/register');;
    }
    render(props) {
        var isLoggedIn = this.props.auth.authenticated;
        var loggedOutUser = <Nav pullRight>
        <NavItem eventKey={1} onClick={this.userLogin.bind(this)}>Login</NavItem>
        <NavItem eventKey={2} onClick={this.userRegister.bind(this)}>Register</NavItem>
        </Nav>;
        var loggedInUser = <Nav pullRight><NavItem href='' onClick={this.userLogout.bind(this)}>Logout</NavItem></Nav>;
        return (
            <div>
            <Navbar collapseOnSelect>
                <Navbar.Header>
                Whats up?
                  <Navbar.Brand>
                    <a href="/">Social-App</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {(isLoggedIn) ? (loggedInUser) : (loggedOutUser)}
                </Navbar.Collapse>
              </Navbar>
              {this.props.children}
              {(isLoggedIn) ? (<Chat />) : (null)}
        </div>
            )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        userSearchResults: state.app.userSearchResults
    })
}

var Container = connect(mapStateToProps)(App);

module.exports = Container;
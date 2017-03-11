import React, { Component } from 'react';
import logo from './logo.svg';

import './main.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from '@sketchpixy/rubix';

const router = require('react-router');
const Link = router.Link;
const actions = require('./actions/index');
const { connect } = require('react-redux');
const AsyncTypeahead = require('react-bootstrap-typeahead').AsyncTypeahead;
const ChatContainer = require('./components/chat-container');

const Notifications = require('react-notification-system-redux');

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
        var topStyle={
            marginTop: 80
        }
        var {notifications} = this.props;
        const notificationStyle = {
          NotificationItem: { // Override the notification item 
            DefaultStyle: { // Applied to every notification, regardless of the notification level 
              margin: '10px 5px 2px 1px'
            },
     
            success: { // Applied only to the success notification item 
              color: 'red'
            }
          }
        };
        return (
            <div style={topStyle}>
            <Notifications
                notifications={notifications}
                style={notificationStyle}
              />
            <Navbar collapseOnSelect fixedTop inverse>
                <Navbar.Header>
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
              {(isLoggedIn) ? (<ChatContainer />) : (null)}
        </div>
            )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        userSearchResults: state.app.userSearchResults,
        notifications: state.notifications
    })
}

var Container = connect(mapStateToProps)(App);

module.exports = Container;
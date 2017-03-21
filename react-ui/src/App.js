import React, { Component } from 'react';
import logo from './logo.svg';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button, Select, Glyphicon } from 'react-bootstrap';

const router = require('react-router');
const Link = router.Link;
const actions = require('./actions/index');
const { connect } = require('react-redux');
const AsyncTypeahead = require('react-bootstrap-typeahead').AsyncTypeahead;
const ChatContainer = require('./components/chat-container');
const axios = require('axios');
const Notifications = require('react-notification-system-redux');
const { LinkContainer } = require('react-router-bootstrap');

const AsyncSearch = require('./components/asyncsearch')

class App extends React.Component {
    userLogout(event) {
        event.preventDefault();
        this.props.dispatch(actions.logoutAction());
        router.browserHistory.push('/login');
    }
    userLogin(event) {
        event.preventDefault();
        router.browserHistory.push('/login');
    }
    userRegister(event) {
        event.preventDefault();
        router.browserHistory.push('/register');
    }
    render(props) {
        var isLoggedIn = this.props.auth.authenticated;
        const LinkStyle = {
            'color': '#06D7D4'
        }
        var loggedOutUser = <Nav pullRight>
        <LinkContainer to='/login'><NavItem eventKey={1}>Login</NavItem></LinkContainer>
        <LinkContainer to='/register'><NavItem eventKey={2}>Register</NavItem></LinkContainer>
        </Nav>;
        var loggedInUser = <Nav pullRight><LinkContainer to={'/profile/'+this.props.auth.user.username}><NavItem>{this.props.auth.user.username}</NavItem></LinkContainer>
        <NavItem style={LinkStyle}>Search Games</NavItem>
        <LinkContainer to='/'><NavItem><Glyphicon glyph='globe'/></NavItem></LinkContainer>
        <LinkContainer to='/friendRequests'><NavItem>Friend Requests</NavItem></LinkContainer>
        <NavItem href='' onClick={this.userLogout.bind(this)}>Logout</NavItem></Nav>;
        var topStyle={
            'overflowX': 'hidden',
            fontFamily: 'Ubuntu',
            backgroundColor: '#f2f2f2',
            height: '100vh',
            paddingTop: '140px'
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
        const navBarStyle = {
            'backgroundColor': '#1D2838',
             color: '#06D7D4',
            'borderColor': '#1D2838',
            paddingTop: '15px',
            paddingBottom: '15px'
        }
        const backgroundStyle = {
            'backgroundColor': '#F2F2F2',
        }
        var brandStyle = {
            color: '#06D7D4',
            fontFamily: 'UbuntuLight',
            fontSize: '1.5em'
        }
        return (
            <div style={topStyle}>
            <Notifications
                notifications={notifications}
                style={notificationStyle}
              />
            <div className='nav-bar'>
            <Navbar fixedTop style={navBarStyle}>
                <Navbar.Header>
                  <Navbar.Brand>
                    <Link to='/' style={brandStyle}>Social Gamers</Link>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Form pullLeft>
                <AsyncSearch />
                </Navbar.Form>
                <Navbar.Collapse>
                    {(isLoggedIn) ? (loggedInUser) : (loggedOutUser)}
                </Navbar.Collapse>
              </Navbar>
              </div>
              <div className='children' style={backgroundStyle}>
              {this.props.children}
              </div>
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
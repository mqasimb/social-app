import React, { Component } from 'react';
import LogOutIcon from './icons/opened-door-aperture.svg'
import AddFriendIcon from './icons/add-friend.svg'
import GamepadIcon from './icons/gamepad-controller.svg'
import UserIcon from './icons/man-user.svg'

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
const io = require('socket.io-client');
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
            'color': '#06D7D4',
            textAlign: 'center'
        }
        var iconSize = {
            height: '20px',
            fill: '#01b8c5'
        }
        var navButtonStyle = {
            textAlign: 'center'
        }
        var textStyle = {
            fontColor: '#01b8c5'
        }
        var loggedOutUser = <Nav pullRight>
        <LinkContainer to='/login'><NavItem eventKey={1}>Login</NavItem></LinkContainer>
        <LinkContainer to='/register'><NavItem eventKey={2}>Register</NavItem></LinkContainer>
        </Nav>;
        var loggedInUser = <Nav pullRight><LinkContainer className="nav-text-container" to={'/profile/'+this.props.auth.user.username}><NavItem style={LinkStyle}><div style={navButtonStyle}><img className style={iconSize} src={UserIcon}/></div><span className='nav-text'>{this.props.auth.user.username}</span></NavItem></LinkContainer>
        <LinkContainer className="nav-text-container" to='/gamesearch'><NavItem style={LinkStyle}><div style={navButtonStyle}><img style={iconSize} src={GamepadIcon}/></div><span className='nav-text'>Search Games</span></NavItem></LinkContainer>
        <LinkContainer className="nav-text-container" to='/friendRequests'><NavItem style={LinkStyle}><div style={navButtonStyle}><img style={iconSize} src={AddFriendIcon}/></div><span className='nav-text'>Friend Requests</span></NavItem></LinkContainer>
        <NavItem className="nav-text-container" style={LinkStyle} href='' onClick={this.userLogout.bind(this)}><div style={navButtonStyle}><img style={iconSize} src={LogOutIcon}/></div><span className='nav-text'>Logout</span></NavItem></Nav>;
        var topStyle={
            'overflowX': 'hidden',
            fontFamily: 'Ubuntu',
            backgroundColor: '#f2f2f2',
            height: '100vh',
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
        var containerStyle = {
            position: 'fixed',
            bottom:0,
            right: '15px'
        }
        return (
            <div className="top-nav" style={topStyle}>
            <Notifications
                notifications={notifications}
                style={notificationStyle}
              />
            <div className='nav-bar'>
            <Navbar className="fixed-top-nav" fixedTop style={navBarStyle}>
                <Navbar.Header>
                  <Navbar.Brand>
                    <Link to='/' style={brandStyle}>Social Gamers</Link>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Form pullLeft>
                {(isLoggedIn) ? (<AsyncSearch />) : (null)}
                </Navbar.Form>
                <Navbar.Collapse>
                    {(isLoggedIn) ? (loggedInUser) : (loggedOutUser)}
                </Navbar.Collapse>
              </Navbar>
              </div>
              <div className='children' style={backgroundStyle}>
              {this.props.children}
              </div>
              {(isLoggedIn) ? (<ChatContainer socket={this.socket}/>) : (null)}
        </div>
            )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        userSearchResults: state.app.userSearchResults,
        notifications: state.notifications,
        mainProfile: state.app.mainProfile
    })
}

var Container = connect(mapStateToProps)(App);

module.exports = Container;
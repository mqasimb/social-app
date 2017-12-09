import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './index.css';

import { Provider } from 'react-redux'
import store from './store'
import { setAuthorizationToken, userLoggedIn } from './actions/index'
import jwtdecode from 'jwt-decode'

import Login from './components/login'
import Register from './components/register'
import SinglePost from './components/singlepost'
import Profile from './components/profile'
import Home from './components/home'
import FriendRequestsContainer from './components/friend-requests-container'
import GameSearch from './components/game-search'

const router = require('react-router');
const Router = router.Router;
const Route = router.Route;
const IndexRoute = router.IndexRoute;
const browserHistory = router.browserHistory;

if(localStorage.jwt) {
    setAuthorizationToken(localStorage.jwt);
    store.dispatch(userLoggedIn(jwtdecode(localStorage.jwt)));
}

var routes = (
    <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/post/:id' component={SinglePost}/>
            <Route path='/profile/:username' component={Profile}/>
            <Route path='/friendrequests' component={FriendRequestsContainer}/>
            <Route path='/gamesearch' component={GameSearch}/>
        </Route>
    </Router>
    </Provider>
)

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('root'));
});
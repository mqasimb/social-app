import React from 'react';
import ReactDOM from 'react-dom';
const App = require('./App');
import './index.css';

const { Provider } = require('react-redux');
const router = require('react-router');
const Router = router.Router;
const Route = router.Route;
const IndexRoute = router.IndexRoute;
const browserHistory = router.browserHistory;
const store = require('./store');
const { setAuthorizationToken, userLoggedIn } = require('./actions/index')
const jwtdecode = require('jwt-decode');

const Login = require('./components/login');
const Register = require('./components/register');
const SinglePost = require('./components/singlepost');
const Profile = require('./components/profile');
const Home = require('./components/home');

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
        </Route>
    </Router>
    </Provider>
)

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('root'));
});
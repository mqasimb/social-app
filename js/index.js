require('babel-polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const router = require('react-router');
const Router = router.Router;
const Route = router.Route;
const IndexRoute = router.IndexRoute;
const browserHistory = router.browserHistory;
const store = require('./store');
const { setAuthorizationToken, userLoggedIn } = require('./actions/index')
const jwtdecode = require('jwt-decode');

const App = require('./components/app')
const Login = require('./components/login');
const Register = require('./components/register');
const Post = require('./components/post');
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
        </Route>
    </Router>
    </Provider>
)

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});
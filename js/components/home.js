var React = require('react');
const router = require('react-router');
const Link = router.Link;
const { connect } = require('react-redux');
const actions = require('../actions/index');

class Home extends React.Component {
    userLogout(event) {
        event.preventDefault();
        this.props.dispatch(actions.logoutAction());
    }
    render() {
        var isLoggedIn = this.props.auth.authenticated;
        return (
            <div>
            {(isLoggedIn) ? (<a href='' onClick={this.userLogout.bind(this)}>Logout</a>) : (<Link to='/login'>Login</Link>)}
            </div>
            )
    }
}

function mapStateToProps(state, porps) {
    return ( {
        auth: state.auth
    })
}

var Container = connect(mapStateToProps)(Home);

module.exports = Container;
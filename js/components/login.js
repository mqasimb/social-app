var React = require('react');
var { connect } = require('react-redux');
const actions = require('../actions/index');

class Login extends React.Component {
    submitLogin(event) {
        event.preventDefault();
        this.props.dispatch(actions.loginAction(this.props.loginInput));
    }
    inputChange(event) {
        this.props.dispatch(actions.updateLoginInput(event.target.name, event.target.value))
    }
    
    render(props) {
        return (
            <div>
            <form onSubmit={this.submitLogin.bind(this)}>
            <label>Username</label><input onChange={this.inputChange.bind(this)} type='text' name='username'/>
            <label>Password</label><input onChange={this.inputChange.bind(this)} type='password' name='password'/>
            <button>Login</button>
            </form>
            </div>
            )
    }
}

function mapStateToProps(state, props) {
    return({
        loginInput: state.loginInput
    })
}

var Container = connect(mapStateToProps)(Login);

module.exports = Container;
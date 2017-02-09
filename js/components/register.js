var React = require('react');
var { connect } = require('react-redux');
const actions = require('../actions/index');
var fetch = require('isomorphic-fetch');
var axios = require('axios');

class Register extends React.Component {
    completeRegistration(event) {
        event.preventDefault();
        this.props.dispatch(actions.registerAction(this.props.registerInput));
    }
    inputChange(event) {
        this.props.dispatch(actions.updateRegistrationInput(event.target.name, event.target.value))
    }
    render(props) {
        return (
            <div>
            <form onSubmit={this.completeRegistration.bind(this)}>
            <label>Username</label><input onChange={this.inputChange.bind(this)} type='text' name='username'/>
            <label>Email</label><input onChange={this.inputChange.bind(this)} type='email' name='email'/>
            <label>Password</label><input onChange={this.inputChange.bind(this)} type='password' name='password'/>
            <label>Confirm Password</label><input onChange={this.inputChange.bind(this)} type='password' name='confirm-password'/>
            <button>Sign Up</button>
            </form>
            </div>
            )
    }
}

function mapStateToProps(state, props) {
    return({
        registerInput: state.registerInput
    })
}

var Container = connect(mapStateToProps)(Register);

module.exports = Container;
var React = require('react');
const router = require('react-router');
var { connect } = require('react-redux');
const actions = require('../actions/index');
const { Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel} = require('react-bootstrap');
const LoginForm = require('./login-form');

class Login extends React.Component {
    submitLogin(values) {
          this.props.dispatch(actions.loginAction(values)).then(function(bool) {
           if(bool) {
               router.browserHistory.push('/');
           } 
        });
    }
    inputChange(event) {
        this.props.dispatch(actions.updateLoginInput(event.target.name, event.target.value))
    }
    
    render(props) {
        return (
            <div>
            <LoginForm onSubmit={this.submitLogin}/>
            </div>
            )
    }
}

function mapStateToProps(state, props) {
    return({
        auth: state.app.auth,
        loginInput: state.app.loginInput,
        flashMessages : state.app.flashMessages
    })
}

var Container = connect(mapStateToProps)(Login);

module.exports = Container;
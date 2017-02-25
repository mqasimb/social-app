const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel} = require('react-bootstrap');
const actions = require('../actions/index');
const { connect } = require('react-redux');

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

const renderField = ({ input, label, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl {...input} name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class LoginForm extends React.Component {
    submitLogin(values) {
      console.log(values)
        this.props.dispatch(actions.registerAction(values))
    }
  render() {
  const { handleSubmit, pristine, submitting } = this.props
  return (
      <div className='login-form'>
            Login
            <Form horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={4}>
                <Field controlId="formHorizontalUsername" name="username" type="text" component={renderField} label="Username" placeholder="Username"/>
              </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={4}>
                <Field controlId="formHorizontalPassword" name="password" type="password" component={renderField} label="Password" placeholder="Password"/>
              </Col>
            </FormGroup>
            
             <FormGroup>
              <Col smOffset={2} sm={10}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <button type="submit" disabled={pristine || submitting}>Sign in</button>
              </Col>
            </FormGroup>
            </Form>
    </div>
  )
}
}

function mapStateToProps(state) {
    return ({
        state: state
    })
}

LoginForm = connect(mapStateToProps)(LoginForm);

LoginForm = reduxForm({
  form: 'LoginForm',  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(LoginForm);

module.exports = LoginForm;
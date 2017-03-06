const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel} = require('@sketchpixy/rubix');
const actions = require('../actions/index');
const { connect } = require('react-redux');

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
      errors.password = 'Please enter a password longer than 8 characters'
  }
  if (!values['confirm-password'] && values.password) {
    errors['confirm-password'] = 'Please confirm your password'
  } else if (values['confirm-password'] != values.password) {
      errors['confirm-password'] = 'Your passwords do not match'
  }
  return errors
}

const renderField = ({ input, label, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl {...input} name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class RegistrationForm extends React.Component {
    completeRegistration(values) {
      console.log(values)
        this.props.dispatch(actions.registerAction(values));
    }
  render() {
  console.log(this.props.state)
  const { handleSubmit, pristine, submitting } = this.props
  return (
      <div className='registration-form'>
            Register Account
            <Form horizontal onSubmit={handleSubmit(this.completeRegistration.bind(this))}>
            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={4}>
                <Field controlId="formHorizontalUsername" name="username" type="text" component={renderField} label="Username" placeholder="Username"/>
              </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={4}>
                <Field controlId="formHorizontalEmail" name="email" type="email" component={renderField} label="Email" placeholder="Email"/>
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
            
            <FormGroup controlId="formHorizontalConfirmPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Confirm Password
              </Col>
              <Col sm={4}>
                <Field controlId="formHorizontalConfirmPassword" name="confirm-password" type="password" component={renderField} label="Confirm-Password" placeholder="Confirm Password"/>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit" disabled={pristine || submitting}>Sign Up</Button>
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

RegistrationForm = connect(mapStateToProps)(RegistrationForm);

RegistrationForm = reduxForm({
  form: 'RegistrationForm',  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(RegistrationForm);

module.exports = RegistrationForm;
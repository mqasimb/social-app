const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel, Row, Panel} = require('react-bootstrap');
const actions = require('../actions/index');
const { connect } = require('react-redux');
const router = require('react-router');
const Link = router.Link;

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
    var formStyle = {
      backgroundColor: '#ffffff',
      paddingBottom: '20px',
      marginTop: '2.5em',
      borderRadius: '0'
    }
    var buttonStyle = {
      backgroundColor: '#1683ac',
      color: '#ffffff',
      fontFamily: 'UbuntuBold',
      fontSize: '1.25em',
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingRight: '30px',
      paddingLeft: '30px',
      borderRadius: '0',
      borderColor: '#1683ac'
    }
    var panelStyle = {
      backgroundColor: '#253243',
      color: '#00fff9',
      textAlign: 'center',
      fontFamily: 'Ubuntu',
      fontSize: '1.5em',
      borderRadius: '0',
      borderColor: '#253243'
    }
    var textStyle = {
      textAlign: 'center'
    }
    var bottomReminderStyle = {
      textAlign: 'center',
      paddingTop: '20px'
    }
    var linkStyle = {
      textDecoration: 'underline',
      fontFamily: 'UbuntuBold'
    }
  const { handleSubmit, pristine, submitting } = this.props
  return (
    <Col xs={12} xsOffset={0} sm={8} smOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4}>
      <div className='registration-form'>
            <Form horizontal style={formStyle} onSubmit={handleSubmit(this.completeRegistration.bind(this))}>
            <Panel style={panelStyle}>REGISTER</Panel>
            <FormGroup controlId="formHorizontalUsername">
              <Row><Col componentClass={ControlLabel} style={textStyle} xsOffset={3} smOffset={3} xs={6} sm={6}>
                Username
              </Col></Row>
              <Col xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Field controlId="formHorizontalUsername" name="username" type="text" component={renderField} label="Username" placeholder="Username"/>
              </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalEmail">
              <Row><Col componentClass={ControlLabel} style={textStyle} xsOffset={3} smOffset={3} xs={6} sm={6}>
                Email
              </Col></Row>
              <Col xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Field controlId="formHorizontalEmail" name="email" type="email" component={renderField} label="Email" placeholder="Email"/>
              </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalPassword">
              <Row><Col componentClass={ControlLabel} style={textStyle} xsOffset={3} smOffset={3} xs={6} sm={6}>
                Password
              </Col></Row>
              <Col xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Field controlId="formHorizontalPassword" name="password" type="password" component={renderField} label="Password" placeholder="Password"/>
              </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalConfirmPassword">
              <Row><Col componentClass={ControlLabel} style={textStyle} xsOffset={3} smOffset={3} xs={6} sm={6}>
                Confirm Password
              </Col></Row>
              <Col xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Field controlId="formHorizontalConfirmPassword" name="confirm-password" type="password" component={renderField} label="Confirm-Password" placeholder="Confirm Password"/>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col style={textStyle} xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Button style={buttonStyle} type="submit" disabled={pristine || submitting}>Sign Up</Button>
              </Col>
            </FormGroup>
            </Form>
            <div style={bottomReminderStyle}>
            Do you already have an account? <Link style={linkStyle} to='login'>Login</Link>
            </div>
    </div>
    </Col>
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
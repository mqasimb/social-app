const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Col, ControlLabel} = require('react-bootstrap');

const validate = values => {
  const errors = {}
  if (!values.message) {
    errors.message = 'Please enter a message'
  }
  return errors
}

const renderField = ({ input, label, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl {...input} name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class MessageForm extends React.Component {
  render() {
  const { handleSubmit, pristine, submitting } = this.props
  return (
      <div className='message-form'>
            <Form horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
            <FormGroup controlId="formHorizontalMessage">
              <Col xs={8}>
                <Field controlId="formHorizontalComment" name="message" type="text" component={renderField} label="Message" placeholder="Write a message..."/>
              </Col>
              <Col xsOffset={0} xs={3}>
                <Button type="submit" disabled={pristine || submitting}>Submit</Button>
              </Col>
            </FormGroup>
            </Form>
    </div>
  )
}
}

MessageForm = reduxForm({  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(MessageForm);

module.exports = MessageForm;
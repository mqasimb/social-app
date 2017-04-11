const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Col, ControlLabel} = require('react-bootstrap');
const actions = require('../actions/index');

const validate = values => {
  const errors = {}
  if (!values.comment) {
    errors.username = 'Please enter a comment'
  }
  return errors
}
var formStyle = {
    backgroundColor: '#f0f2f5'
  }
const renderField = ({ input, label, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl style={formStyle} {...input} name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class CommentForm extends React.Component {
    submitLogin(values) {
        this.props.dispatch(actions.registerAction(values))
    }
  render() {
  var formStyle = {
    paddingTop: '30px',
    textAlign: 'center'
  }
  const { handleSubmit, pristine, submitting } = this.props
  return (
      <div className='comment-form'>
            <Form style={formStyle} horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
            <FormGroup controlId="formHorizontalComment">
              <Col xs={12} sm={6} smOffset={3} md={6} lg={6}>
                <Field controlId="formHorizontalComment" name="comment" type="text" component={renderField} label="Comment" placeholder="Write a comment..."/>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col>
                <Button bsStyle="info" type="submit" disabled={pristine || submitting}>Submit Comment</Button>
              </Col>
            </FormGroup>
            </Form>
    </div>
  )
}
}

CommentForm = reduxForm({  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(CommentForm);

module.exports = CommentForm;
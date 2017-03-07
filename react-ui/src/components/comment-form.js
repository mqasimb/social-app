const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel} = require('@sketchpixy/rubix');
const actions = require('../actions/index');
const { connect } = require('react-redux');

const validate = values => {
  const errors = {}
  if (!values.comment) {
    errors.username = 'Please enter a comment'
  }
  return errors
}

const renderField = ({ input, label, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl {...input} name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class CommentForm extends React.Component {
    submitLogin(values) {
      console.log(values)
        this.props.dispatch(actions.registerAction(values))
    }
  render() {
      console.log(this.props)
  const { handleSubmit, pristine, submitting } = this.props
  return (
      <div className='comment-form'>
            <Form horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
            <FormGroup controlId="formHorizontalComment">
              <Col componentClass={ControlLabel} sm={2}>
                Comment
              </Col>
              <Col sm={4}>
                <Field controlId="formHorizontalComment" name="comment" type="text" component={renderField} label="Comment" placeholder="Write a comment..."/>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit" disabled={pristine || submitting}>Submit Comment</Button>
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
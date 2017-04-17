const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Col, ControlLabel} = require('react-bootstrap');
const actions = require('../actions/index');

const validate = values => {
  const errors = {}
  if (!values.content) {
    errors.content = 'Please some text for the post'
  }
  return errors
}

const renderField = ({ input, label, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl {...input} name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class EditPostForm extends React.Component {
  render() {
  const { handleSubmit, pristine, submitting } = this.props
  return (
      <div className='edit-post-form'>
            <Form horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
            <FormGroup controlId="formHorizontalEditPost">
              <Col componentClass={ControlLabel} sm={2}>
                Edit Post
              </Col>
              <Col sm={4}>
                <Field controlId="formHorizontalPost" name="content" type="text" component={renderField} label="Post" placeholder="Write a post..."/>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col xsOffset={1} xs={4} smOffset={2} sm={2}>
                <Button bsStyle="info" type="submit" disabled={pristine || submitting}>Submit Edit</Button>
              </Col>
              <Col xsOffset={1} xs={4} smOffset={0} sm={2}>
                <Button bsStyle="info" type="submit" onClick={this.props.cancel.bind(this)}>Cancel Edit</Button>
              </Col>
            </FormGroup>
            </Form>
    </div>
  )
}
}

EditPostForm = reduxForm({  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(EditPostForm);

module.exports = EditPostForm;
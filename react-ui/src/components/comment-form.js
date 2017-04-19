const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Col, ControlLabel} = require('react-bootstrap');
const actions = require('../actions/index');

const validate = values => {
    const errors = {}
    if (!values.comment) {
        errors.comment = 'Please enter a comment'
    }
    return errors
}
var formStyle = {
    backgroundColor: '#f0f2f5'
}
const renderField = ({ input, label, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
        <FormControl style={formStyle} {...input} componentClass="textarea" name={name} type={type} placeholder={placeholder} />
        <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class CommentForm extends React.Component {
    render() {
        var formStyle = {
            paddingTop: '30px',
            textAlign: 'center'
        }
        var buttonStyle = {
            backgroundColor: '#1683ac',
            color: '#ffffff',
            fontFamily: 'UbuntuBold',
            fontSize: '1.1em',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingRight: '15px',
            paddingLeft: '15px',
            borderRadius: '0',
            borderColor: '#1683ac',
            textAlign: 'right'
        }
        var buttonContainerStyle = {
            textAlign: 'right'
        }
        const { handleSubmit, pristine, submitting } = this.props
        return (
            <div className='comment-form'>
                <Form style={formStyle} horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
                    <FormGroup controlId="formHorizontalComment">
                        <Col xs={11} sm={11} md={11} lg={11}>
                            <Field controlId="formHorizontalComment" name="comment" type="text" component={renderField} label="Comment" placeholder="Write a comment..."/>
                        </Col>
                    </FormGroup>
                    
                    <FormGroup>
                        <Col style={buttonContainerStyle} xs={11} sm={11} md={11} lg={11}>
                            <Button style={buttonStyle} type="submit" disabled={pristine || submitting}>Submit Comment</Button>
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
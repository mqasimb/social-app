const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Col, ControlLabel} = require('react-bootstrap');

const validate = values => {
    const errors = {}
    if (!values.aboutMe) {
        errors.aboutMe = 'Please enter some details about yourself'
    }
    return errors
}

const renderField = ({ input, label, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
        <FormControl {...input} name={name} type={type} placeholder={placeholder} />
        <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class AboutMeForm extends React.Component {
    render() {
        const { handleSubmit, pristine, submitting, onSubmit, cancel } = this.props
        return (
            <div className='edit-aboutme-form'>
                <Form horizontal onSubmit={handleSubmit(onSubmit.bind(this))}>
                    <FormGroup controlId="formHorizontalEditAboutMe">
                        <Col componentClass={ControlLabel} sm={2}>
                            About Me
                        </Col>
                        <Col sm={4}>
                            <Field controlId="formHorizontalAboutMe" name="aboutMe" type="text" component={renderField} label="About Me" placeholder="Write your about me..."/>
                        </Col>
                    </FormGroup>
                    
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit" disabled={pristine || submitting}>Submit Edit</Button>
                        </Col>
                    </FormGroup>
                    
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit" onClick={cancel.bind(this)}>Cancel Edit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

AboutMeForm = reduxForm({
  validate
})(AboutMeForm);

module.exports = AboutMeForm;
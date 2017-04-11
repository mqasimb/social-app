const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { Form, FormControl, FormGroup, Button, Col, ControlLabel, Row} = require('react-bootstrap');

const validate = values => {
  const errors = {}
  if (!values.comment) {
    errors.username = 'Please enter a value'
  }
  return errors
}

var inputStyle = {
            'backgroundColor': '#1d2838',
            'borderColor': '#1d2838',
            color: 'white',
            'fontFamily': 'Ubuntu, sans-serif'
  }
const renderField = ({ input, label, name, type, controlId, placeholder, meta: { touched, error, warning } }) => (
    <div>
    <FormControl style={inputStyle} {...input} name={name} type={type} placeholder={placeholder} />
    <ControlLabel>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</ControlLabel>
    </div>
)

class GameSearchForm extends React.Component {
  render() {
  const { handleSubmit, pristine, submitting } = this.props
  var formStyle={
    'backgroundColor': '#253243',
    'fontFamily': 'Ubuntu, sans-serif',
    paddingTop: '30px',
    paddingBottom: '30px',
    borderRadius: '0'
  }
  var labelStyle={
    color: 'white',
    'fontFamily': 'Ubuntu, sans-serif',
    textAlign: 'center',
    paddingBottom: '20px'
  }
  var buttonStyle = {
    backgroundColor: '#1683ac',
    color: '#ffffff',
    fontFamily: 'UbuntuBold',
    fontSize: '1em',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingRight: '10px',
    paddingLeft: '10px',
    borderRadius: '0',
    borderColor: '#1683ac'
  }
  var textStyle = {
    textAlign: 'center'
  }
  return (
    <Col>
      <div className='game-search-form'>
            <Form style={formStyle} horizontal onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
            <FormGroup controlId="formHorizontalSearchGames">
            <Row>
              <Col style={labelStyle} componentClass={ControlLabel} xs={6} xsOffset={3} md={4} mdOffset={4}>
                Search Games
              </Col>
              </Row>
              <Row>
              <Col xs={6} xsOffset={3} md={4} mdOffset={4}>
                <Field controlId="formHorizontalSearch" name="search" type="text" component={renderField} label="Search" placeholder="Search games..."/>
              </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Col style={textStyle} xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Button style={buttonStyle} type="submit" disabled={pristine || submitting}>Search</Button>
              </Col>
            </FormGroup>
            </Form>
    </div>
    </Col>
  )
}
}

GameSearchForm = reduxForm({  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(GameSearchForm);

module.exports = GameSearchForm;
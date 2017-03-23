const React = require('react');
const { Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel, Row, Panel} = require('react-bootstrap');
const router = require('react-router');
const { Link } = require('react-router');

class Friend extends React.Component {
    render(props) {
        var imageStyle = {
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: '#253243',
            borderRadius: '50%',
        }
        var fontStyle = {
            fontFamily: 'Ubuntu',
            fontSize: '1em',
            paddingLeft: '20px',
            fontColor: '#253243'
        }
        var paddingStyle = {
            paddingBottom: '15px'
        }
        return (
            <div style={paddingStyle}>
            <img style={imageStyle} width={64} height={64} src={this.props.ProfilePicture} /><Link to={'/profile/'+this.props.username}><span style={fontStyle}>{this.props.username}</span></Link>
            </div>
        )
    }
}

module.exports = Friend;
const React = require('react');
const { Link } = require('react-router');

class Friend extends React.Component {
    render(props) {
        const { ProfilePicture, username } = this.props;
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
                <img style={imageStyle} width={64} height={64} role="presentation" src={ProfilePicture} /><Link to={'/profile/'+username}><span style={fontStyle}>{username}</span></Link>
            </div>
        )
    }
}

module.exports = Friend;
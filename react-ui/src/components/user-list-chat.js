const React = require('react');
const { connect } = require('react-redux');
const actions = require('../actions/index');

class UserListChat extends React.Component {
    openChat() {
        var friend = this.props.friend.toLowerCase();
        var username = this.props.auth.user.username.toLowerCase();
        var roomName = (friend < username) ? (friend+'-'+username) : (username+'-'+friend);
        this.props.socket.emit('chat-started', {friend: this.props.friend, username: this.props.auth.user.username, roomName: roomName})
        this.props.dispatch(actions.openChat({friend: this.props.friend, username: this.props.auth.user.username, roomName: roomName}))
    }
    render(props) {
        const { picture, friend } = this.props;
        var imageStyle = {
            width: '40px',
            height: '40px'
        }
        var fontStyle = {
            color: '#ffffff',
            paddingLeft: '10px'
        }
        var divStyle = {
            backgroundColor: '#253243',
            paddingLeft: '10px',
            paddingTop: '10px',
            paddingBottom: '10px',
            width: '200px'
        }
        return (
            <div style={divStyle} onClick={this.openChat.bind(this)}>
                <img style={imageStyle} role="presentation" src={picture} /> <span style={fontStyle}>{friend}</span>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
    })
}
var Container = connect(mapStateToProps)(UserListChat);

module.exports = Container;

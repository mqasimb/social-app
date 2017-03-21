var React = require('react');
var { connect } = require('react-redux');
const Content = require('./content');
const actions = require('../actions/index');
const LikeBox = require('./likebox');
const router = require('react-router');
const { Button } = require('react-bootstrap');

class UserListChat extends React.Component {
    openChat() {
            var friend = this.props.friend.toLowerCase();
            var username = this.props.auth.user.username.toLowerCase();
            var roomName = (friend < username) ? (friend+'-'+username) : (username+'-'+friend);
            this.props.socket.emit('chat-started', {friend: this.props.friend, username: this.props.auth.user.username, roomName: roomName})
            this.props.dispatch(actions.openChat({friend: this.props.friend, username: this.props.auth.user.username, roomName: roomName}))
        }
    render(props) {
        return (
            <div onClick={this.openChat.bind(this)}>
            {this.props.friend}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        friendsOnline: state.app.friendsOnline
    })
}
var Container = connect(mapStateToProps)(UserListChat);

module.exports = Container;

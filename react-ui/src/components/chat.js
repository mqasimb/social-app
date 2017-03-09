var React = require('react');
var { connect } = require('react-redux');
const Content = require('./content');
const actions = require('../actions/index');
const LikeBox = require('./likebox');
const router = require('react-router');
const { Button } = require('@sketchpixy/rubix');
const ChatBox = require('./chat-box');
const io = require('socket.io-client');
const MessageForm = require('./message-form');
const UserListChat = require('./user-list-chat');

class Chat extends React.Component {
    componentDidMount() {
        this.props.socket.emit('private-chat', 5)
    }
    _handleSubmit(values) {
        this.props.socket.emit('private-chat-message', {username: this.props.auth.user.username, message:values.message, channelID:5})
    }
    render(props) {
        return (
            <div>
            <ChatBox />
            <MessageForm onSubmit={this._handleSubmit.bind(this)} form="MessageForm"/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        chatMessages: state.app.chatMessages
    })
}
var Container = connect(mapStateToProps)(Chat);

module.exports = Container;

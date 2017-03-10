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
        var firstIndex = this.props.chatsOpen.findIndex((friend) => {
            return friend.username === this.props.name
        })
        this.props.socket.emit('private-chat', this.props.chatsOpen[firstIndex].roomName)
    }
    _handleSubmit(values) {
        var firstIndex = this.props.chatsOpen.findIndex((friend) => {
            return friend.username === this.props.name
        })
        this.props.socket.emit('private-chat-message', {username: this.props.auth.user.username, friend: this.props.chatsOpen[firstIndex].username, message:values.message, channelID: this.props.chatsOpen[firstIndex].roomName})
    }
    render(props) {
        return (
            <div>
            {this.props.name}
            <ChatBox name={this.props.name}/>
            <MessageForm onSubmit={this._handleSubmit.bind(this)} form="MessageForm"/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        chatMessages: state.app.chatMessages,
        chatsOpen: state.app.chatsOpen
    })
}
var Container = connect(mapStateToProps)(Chat);

module.exports = Container;

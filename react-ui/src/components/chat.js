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
        this.props.socket.emit('private-chat', this.props.chatsOpen[this.props.name])
    }
    _handleSubmit(values) {
        this.props.socket.emit('private-chat-message', {username: this.props.auth.user.username, friend: this.props.name, message:values.message, channelID: this.props.chatsOpen[this.props.name]})
        this.props.dispatch(actions.chatSubmit({username: this.props.auth.user.username, friend: this.props.name, message:values.message, channelID: this.props.chatsOpen[this.props.name]}))
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

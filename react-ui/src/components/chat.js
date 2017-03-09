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

class Chat extends React.Component {
    componentDidMount() {
        this.socket = io();
        this.socket.emit('user-online', this.props.auth.user.username);
        this.socket.on('private-chat-message', (data) => {
            console.log(data)
            this.props.dispatch(actions.socketReceived(data))
        })
        this.socket.emit('user-online', this.props.auth.user.username);
    }
    _handleClick(values) {
        this.socket.emit('private-chat', 5)
    }
    _handleSubmit(values) {
        this.socket.emit('private-chat-message', {message:values.message, channelID:5})
    }
    render(props) {
        var chatBoxStyle = {
            width: 300,
            height: 500,
            position: 'fixed',
            bottom: 10,
            right: 0,
            'zindex': 1
        }
        return (
            <div className='chat-messages' style={chatBoxStyle}>
            <Button onClick={this._handleClick.bind(this)}>button</Button>
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

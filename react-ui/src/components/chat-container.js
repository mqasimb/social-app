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
const Chat = require('./chat');

class ChatContainer extends React.Component {
    componentDidMount() {
        this.socket = io();
        this.socket.emit('user-online', this.props.auth.user.username);
        this.socket.on('friend-online', (username) => {
            this.props.dispatch(actions.friendOnline(username));
        })
        this.socket.on('private-chat-message', (data) => {
            console.log(data)
            this.props.dispatch(actions.socketReceived(data))
        })
        this.socket.on('chat-started', (friend) => {
            console.log(friend)
            this.props.dispatch(actions.openChat(friend))
        })
    }

    render(props) {
        var chatBoxStyle = {
            width: 300,
            height: 500
            
        }
        var friendListStyle = {
            position: 'fixed',
            top:0,
            left:0
        }
        var chats = this.props.chatsOpen.map((chat) => {
            return <Chat name={chat} socket={this.socket}/>
        })
        var onlineFriendsList = this.props.friendsOnline.map((friend) => {
            return <UserListChat socket={this.socket} friend={friend} />
        })
        return (
            <div>
            <div className='chat-messages' style={chatBoxStyle}>
            {chats}
            </div>
            <div className='friend-list' style={friendListStyle}>
            {onlineFriendsList}
            </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        chatMessages: state.app.chatMessages,
        friendsOnline: state.app.friendsOnline,
        chatsOpen: state.app.chatsOpen
    })
}
var Container = connect(mapStateToProps)(ChatContainer);

module.exports = Container;

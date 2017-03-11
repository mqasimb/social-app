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
            this.props.dispatch(actions.userConnect(username));
        })
        this.socket.on('private-chat-message', (data) => {
            console.log(data)
            this.props.dispatch(actions.messageReceived(data))
        })
        this.socket.on('chat-started', (chatData) => {
            this.socket.emit('join-private-chat', chatData.roomName)
            this.props.dispatch(actions.openChatWithSocket(chatData))
        })
        this.socket.on('user-disconnected', (username) => {
            this.props.dispatch(actions.userDisconnect(username));
        })
    }

    render(props) {
        var chatBoxStyle = {
            width: 300,
            height: 500
        }
        var friendListStyle = {
            position: 'fixed',
            bottom:0,
            right:0
        }
        var chats = Object.keys(this.props.chatsOpen).map((key, index) => {
            return <Chat key={index} name={key} socket={this.socket}/>
        });
        var onlineFriendsList = this.props.friendsOnline.map((friend, index) => {
            return <UserListChat key={index} socket={this.socket} friend={friend.username} />
        })
        return (
            <div>
            <div className='chat-messages'>
            {chats}
            </div>
            <div className='friend-list' style={friendListStyle}>
            Online Users
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

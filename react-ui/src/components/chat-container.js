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
const Notifications = require('react-notification-system-redux');

const friendRequestReceived = {
  // uid: 'once-please', // you can specify your own uid if required 
  title: 'Friend Request',
  message: 'New Friend Request Received',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'View Requests',
    callback: () => (router.browserHistory.push('/friendrequests'))
  }
};

class ChatContainer extends React.Component {
    handleClick() {
            console.log('handle click ran');
            this.props.dispatch(Notifications.success(friendRequestReceived));
        }
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
        this.socket.on('friend-request', (requestUsername) => {
            console.log('friend request reached back socket')
            this.handleClick()
            this.props.dispatch(actions.receivedFriendRequest(requestUsername))
        })
        this.socket.on('accept-friend-request', (requestUsername) => {
            console.log('friend request reached back socket')
            this.handleClick()
            this.props.dispatch(actions.acceptedFriendRequest(requestUsername))
        })
        this.socket.on('cancel-friend-request', (requestUsername) => {
            console.log('friend request reached back socket')
            this.handleClick()
            this.props.dispatch(actions.cancelledFriendRequest(requestUsername))
        })
        this.socket.on('deny-friend-request', (requestUsername) => {
            console.log('friend request reached back socket')
            this.handleClick()
            this.props.dispatch(actions.deniedFriendRequest(requestUsername))
        })
        this.socket.on('remove-friend', (requestUsername) => {
            console.log('friend request reached back socket')
            this.handleClick()
            this.props.dispatch(actions.removedAsFriend(requestUsername))
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

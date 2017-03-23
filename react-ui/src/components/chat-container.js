var React = require('react');
var { connect } = require('react-redux');
const Content = require('./content');
const actions = require('../actions/index');
const LikeBox = require('./likebox');
const router = require('react-router');
const { Button, Panel } = require('react-bootstrap');
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
    constructor(props) {
    super(props);
    this.state = {chatOpen: false}
        }
    openChat() {
        if(this.state.chatOpen === true) {
            this.setState({chatOpen: false})
        }
        else {
            this.setState({chatOpen: true})
        }
    }
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
            this.props.dispatch(actions.messageReceived(data));
            this.props.dispatch(actions.saveMessagesToProfile(data.username, data))
        })
        this.socket.on('chat-started', (chatData) => {
            this.socket.emit('join-private-chat', chatData.roomName)
            this.props.dispatch(actions.openChatWithSocket(chatData))
        })
        this.socket.on('user-disconnected', (username) => {
            this.props.dispatch(actions.userDisconnect(username));
        })
        this.socket.on('friend-request', (requestUsername, ProfilePicture) => {
            console.log('friend request reached back socket')
            this.handleClick()
            this.props.dispatch(actions.receivedFriendRequest(requestUsername, ProfilePicture))
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
            right: '15px'
        }
        var panelStyle = {
          backgroundColor: '#253243',
          color: '#00fff9',
          textAlign: 'center',
          fontFamily: 'Ubuntu',
          fontSize: '1em',
          borderRadius: '0',
          borderColor: '#253243',
          marginBottom: '0px',
          width: '200px'
        }
        var chats = Object.keys(this.props.chatsOpen).map((key, index) => {
            return <Chat key={index} name={key} socket={this.socket}/>
        });
        var onlineFriendsList = this.props.friendsOnline.map((friend, index) => {
            return <UserListChat key={index} socket={this.socket} picture={friend.ProfilePicture} friend={friend.username} />
        })
        return (
            <div>
            <div className='chat-messages'>
            {chats}
            </div>
            <div className='friend-list' style={friendListStyle}>
            <Panel style={panelStyle} onClick={this.openChat.bind(this)}>Online Friends: {this.props.friendsOnline.length}</Panel>
            {(this.state.chatOpen) ? (onlineFriendsList) : (null)}
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

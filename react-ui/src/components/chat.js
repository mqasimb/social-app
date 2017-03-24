const React = require('react');
const { connect } = require('react-redux');
const Content = require('./content');
const actions = require('../actions/index');
const LikeBox = require('./likebox');
const router = require('react-router');
const { Button, Glyphicon } = require('react-bootstrap');
const ChatBox = require('./chat-box');
const io = require('socket.io-client');
const MessageForm = require('./message-form');
const UserListChat = require('./user-list-chat');
const Dropzone = require('react-dropzone');
const request = require('superagent');
const apikeys = require('../../../apikeys');
const { reset } = require('redux-form');

class Chat extends React.Component {
    componentDidMount() {
        this.props.socket.emit('private-chat', this.props.chatsOpen[this.props.name])
    }
    _handleSubmit(values) {
        this.props.socket.emit('private-chat-message', {username: this.props.auth.user.username, friend: this.props.name, message:values.message, channelID: this.props.chatsOpen[this.props.name], image: (this.props.chatImagesUploadUrl[this.props.name]) ? (this.props.chatImagesUploadUrl[this.props.name]) : (null)})
        this.props.dispatch(actions.persistMessage(this.props.auth.user.username, {username: this.props.auth.user.username, friend: this.props.name, message:values.message, channelID: this.props.chatsOpen[this.props.name], image: (this.props.chatImagesUploadUrl[this.props.name]) ? (this.props.chatImagesUploadUrl[this.props.name]) : (null)}))
        this.props.dispatch(actions.saveMessagesToProfile(this.props.name, {username: this.props.auth.user.username, friend: this.props.name, message:values.message, channelID: this.props.chatsOpen[this.props.name], image: (this.props.chatImagesUploadUrl[this.props.name]) ? (this.props.chatImagesUploadUrl[this.props.name]) : (null)}))
        this.props.dispatch(actions.chatSubmit({username: this.props.auth.user.username, friend: this.props.name, message:values.message, channelID: this.props.chatsOpen[this.props.name], image: (this.props.chatImagesUploadUrl[this.props.name]) ? (this.props.chatImagesUploadUrl[this.props.name]) : (null)}))
        this.props.dispatch(reset("MessageForm -"+this.props.name));
    }
    onImageDrop(files) {
        this.props.dispatch(actions.uploadMessageImage(files[0], this.props.name));
        this.handleImageUpload(files[0]);
    }
    handleImageUpload(file) {
    let upload = request.post(apikeys.CLOUDINARY_UPLOAD_URL)
                        .field('api_key', apikeys.CLOUDINARY_API_KEY)
                        .field('api-secret', apikeys.CLOUDINARY_API_SECRET)
                        .field('upload_preset', apikeys.CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.props.dispatch(actions.setMessageImageCloudinaryURL(response.body.secure_url, this.props.name));
      }
    });
    }
    loadMessageHistory() {
        this.props.dispatch(actions.loadOlderMessages(this.props.name))
    }
    render(props) {
        var dropzoneStyle = {position: 'absolute', bottom: '25', right: '85', zIndex: '1', textAlign: 'center', display: 'inline-block', width:20, height:20, cursor: 'pointer', color: '#1d2838'}
        var chatBoxStyle = {
            width: 300,
            height: 300,
            display: 'inline-block',
            backgroundColor: '#f2f2f2',
            borderWith: '1px',
            borderColor: '#ffffff',
            borderStyle: 'solid'
        }
        var chatHeaderStyle = {
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '20px'
        }
        var chatBottomStyle = {
            position: 'relative'
        }
        var imgStyle = {width: 40, height: 40}
        var firstIndex = this.props.mainProfile.messages.findIndex((friend) => {
            return friend.friend === this.props.name
        })
        var loadHistoryButton = (firstIndex > -1) ? ((this.props.mainProfile.messages[firstIndex].messages.length > this.props.chatMessages[this.props.name].length) ? (<Button onClick={this.loadMessageHistory.bind(this)}>Load Message History</Button>) : (null)) : (null)
        var profileImage;
        return (
            <div style={chatBoxStyle}>
            <div style={chatHeaderStyle}>{this.props.name} {loadHistoryButton}</div>
            <ChatBox name={this.props.name}/>
            <div style={chatBottomStyle}>
            <MessageForm onSubmit={this._handleSubmit.bind(this)} form={"MessageForm -"+this.props.name}/>
            <Dropzone style={dropzoneStyle} multiple={false} accept="image/*" onDrop={this.onImageDrop.bind(this)}><Glyphicon glyph="picture"/></Dropzone>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        chatMessages: state.app.chatMessages,
        chatsOpen: state.app.chatsOpen,
        mainProfile: state.app.mainProfile,
        chatImagesUploadUrl: state.app.chatImagesUploadUrl
    })
}
var Container = connect(mapStateToProps)(Chat);

module.exports = Container;

const React = require('react');
const { connect } = require('react-redux');
const Content = require('./content');
const actions = require('../actions/index');
const LikeBox = require('./likebox');
const router = require('react-router');
const { Button } = require('@sketchpixy/rubix');
const ChatBox = require('./chat-box');
const io = require('socket.io-client');
const MessageForm = require('./message-form');
const UserListChat = require('./user-list-chat');
const Dropzone = require('react-dropzone');
const request = require('superagent');
const apikeys = require('../../../apikeys');

class Chat extends React.Component {
    componentDidMount() {
        this.props.socket.emit('private-chat', this.props.chatsOpen[this.props.name])
    }
    _handleSubmit(values) {
        this.props.socket.emit('private-chat-message', {username: this.props.auth.user.username, friend: this.props.name, message:values.message, channelID: this.props.chatsOpen[this.props.name], image: (this.props.chatImagesUploadUrl[this.props.name]) ? (this.props.chatImagesUploadUrl[this.props.name]) : (null)})
        this.props.dispatch(actions.chatSubmit({username: this.props.auth.user.username, friend: this.props.name, message:values.message, channelID: this.props.chatsOpen[this.props.name], image: (this.props.chatImagesUploadUrl[this.props.name]) ? (this.props.chatImagesUploadUrl[this.props.name]) : (null)}))
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
    render(props) {
        var chatBoxStyle = {
            width: 300,
            height: 300,
            display: 'inline-block'
        }
        var imgStyle = {width: 75, height: 75}
        return (
            <div style={chatBoxStyle}>
            {this.props.name}
            <ChatBox name={this.props.name}/>
            <MessageForm onSubmit={this._handleSubmit.bind(this)} form="MessageForm"/>
            <Dropzone multiple={false} accept="image/*" onDrop={this.onImageDrop.bind(this)}> <p>Drop an image or click to select a file to upload.</p></Dropzone>
            <img src={this.props.chatImagesUploadUrl[this.props.name]} style={imgStyle}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        chatMessages: state.app.chatMessages,
        chatsOpen: state.app.chatsOpen,
        chatImagesUploadUrl: state.app.chatImagesUploadUrl
    })
}
var Container = connect(mapStateToProps)(Chat);

module.exports = Container;

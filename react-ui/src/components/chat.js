const React = require('react');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const { Button, Glyphicon } = require('react-bootstrap');
const ChatBox = require('./chat-box');
const MessageForm = require('./message-form');
const Dropzone = require('react-dropzone');
const request = require('superagent');
const { reset } = require('redux-form');
const axios = require('axios');

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
        axios.get('/api/cloudinary')
            .then(resp => resp.data)
            .then(json => {
                let upload = request.post(json.cloudinaryURL)
                        .field('api_key', json.apiKey)
                        .field('api-secret', json.apiSecret)
                        .field('upload_preset', json.uploadPreset)
                        .field('file', file);

                upload.end((err, response) => {
                  if (err) {
                    console.error(err);
                  }
                  if (response.body.secure_url !== '') {
                    this.props.dispatch(actions.setMessageImageCloudinaryURL(response.body.secure_url, this.props.name));
                  }
                });
            })
    }
    loadMessageHistory() {
        this.props.dispatch(actions.loadOlderMessages(this.props.name))
    }
    closeChat() {
        this.props.dispatch(actions.closeChat(this.props.name))
    }
    render(props) {
        const { mainProfile, chatMessages, name } = this.props;
        var dropzoneStyle = {
            position: 'absolute', 
            bottom: '25', 
            right: '85', 
            zIndex: '1', 
            textAlign: 'center', 
            display: 'inline-block', 
            width:20, 
            height:20, 
            cursor: 'pointer', 
            color: '#1d2838'
        }
        var chatBoxStyle = {
            width: 300,
            height: 300,
            display: 'inline-block',
            backgroundColor: '#f2f2f2',
            borderWith: '1px',
            borderColor: '#ffffff',
            borderStyle: 'solid',
        }
        var chatHeaderStyle = {
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '20px',
            position: 'relative'
        }
        var chatBottomStyle = {
            position: 'relative'
        }
        var glyphStyle = {
            position: 'absolute',
            right: '0',
            top: '0'
        }
        var firstIndex = mainProfile.messages.findIndex((friend) =>
            friend.friend === name
        )
        var loadHistoryButton = (firstIndex > -1) ? ((mainProfile.messages[firstIndex].messages.length > chatMessages[name].length) ? (<Button onClick={this.loadMessageHistory.bind(this)}>Load Message History</Button>) : (null)) : (null)
        return (
            <div style={chatBoxStyle}>
                <div style={chatHeaderStyle}>{name} {loadHistoryButton}<Glyphicon style={glyphStyle} onClick={this.closeChat.bind(this)} glyph="remove"/></div>
                <ChatBox name={name}/>
                <div style={chatBottomStyle}>
                    <MessageForm onSubmit={this._handleSubmit.bind(this)} form={"MessageForm -"+name}/>
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

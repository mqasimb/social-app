var React = require('react');
var { connect } = require('react-redux');
const Content = require('./content');
const actions = require('../actions/index');
const LikeBox = require('./likebox');
const router = require('react-router');
const { Button } = require('react-bootstrap');
const Infinite = require('react-infinite');

class ChatBox extends React.Component {
    render(props) {
        var imageStyle={
            width: 50,
            height: 50
        }
        var profilePic;
        var messagesList = this.props.chatMessages[this.props.name].map((message, index) => {
            if(message.username === this.props.mainProfile.username) {
                profilePic = this.props.mainProfile.ProfilePicture;
            }
            else {
                var firstIndex = this.props.mainProfile.Friends.findIndex((friend) => {
                return friend.username === this.props.name;
                })
                if(firstIndex > -1) {
                    profilePic = this.props.mainProfile.Friends[firstIndex].ProfilePicture;
                }  
                }
            return <div key={index}><div><img width={40} height={40} src={profilePic} alt="Image"/>{message.username}: {message.message}</div>{(message.image) ? (<div><img style={imageStyle} src={message.image}/></div>) : (null)}</div>
        })
        return (
            <div>
            <Infinite containerHeight={200} elementHeight={24}
          displayBottomUpwards>
            {messagesList}
            </Infinite>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        chatMessages: state.app.chatMessages,
        mainProfile: state.app.mainProfile
    })
}
var Container = connect(mapStateToProps)(ChatBox);

module.exports = Container;

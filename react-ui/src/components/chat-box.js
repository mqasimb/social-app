const React = require('react');
const { connect } = require('react-redux');
const Infinite = require('react-infinite');

class ChatBox extends React.Component {
    render(props) {
        var imageStyle={
            width: 40,
            height: 40
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
            return <div key={index}><div><img width={40} height={40} role="presentation" src={profilePic}/>{message.username}: {message.message}</div>{(message.image) ? (<img style={imageStyle} role="presentation" src={message.image}/>) : (null)}</div>
        })
        return (
            <div>
            <Infinite containerHeight={200} elementHeight={40}
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

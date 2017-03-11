var React = require('react');
var { connect } = require('react-redux');
const Content = require('./content');
const actions = require('../actions/index');
const LikeBox = require('./likebox');
const router = require('react-router');
const { Button } = require('@sketchpixy/rubix');
const Infinite = require('react-infinite');

class ChatBox extends React.Component {
    render(props) {
        var imageStyle={
            width: 50,
            height: 50
        }
        var messagesList = this.props.chatMessages[this.props.name].map(function(message, index) {
            return <div key={index}><div>{message.username}: {message.message}</div>{(message.image) ? (<div><img style={imageStyle} src={message.image}/></div>) : (null)}</div>
        })
        return (
            <div>
            <Infinite containerHeight={200} elementHeight={24, 50}
          displayBottomUpwards>
            {messagesList}
            </Infinite>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        chatMessages: state.app.chatMessages
    })
}
var Container = connect(mapStateToProps)(ChatBox);

module.exports = Container;

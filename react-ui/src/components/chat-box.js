var React = require('react');
var { connect } = require('react-redux');
const Content = require('./content');
const actions = require('../actions/index');
const LikeBox = require('./likebox');
const router = require('react-router');
const { Button } = require('@sketchpixy/rubix');

class ChatBox extends React.Component {
    render(props) {
        var messagesList = this.props.chatMessages[this.props.name].map(function(message) {
            return <li>{message.username}: {message.message}</li>
        })
        return (
            <div>
            {messagesList}
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

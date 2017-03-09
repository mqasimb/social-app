var React = require('react');
var { connect } = require('react-redux');
const Content = require('./content');
const actions = require('../actions/index');
const LikeBox = require('./likebox');
const router = require('react-router');
const { Button } = require('@sketchpixy/rubix');

class UserListChat extends React.Component {
    openChat() {
            this.props.dispatch(actions.openChat(this.props.friend))
        }
    render(props) {
        return (
            <div onClick={this.openChat.bind(this)}>
            {this.props.friend}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        friendsOnline: state.app.friendsOnline
    })
}
var Container = connect(mapStateToProps)(UserListChat);

module.exports = Container;

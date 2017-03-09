var React = require('react');
var { connect } = require('react-redux');
const Content = require('./content');
const actions = require('../actions/index');
const LikeBox = require('./likebox');
const router = require('react-router');
const { Button } = require('@sketchpixy/rubix');

class UserListChat extends React.Component {
    render(props) {
        var onlineFriendsList = this.props.onlineFriends.map(function(friend) {
            return <li>{friend.name}</li>
        })
        return (
            <div>
            {onlineFriendsList}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        onlineFriends: state.app.onlineFriends
    })
}
var Container = connect(mapStateToProps)(UserListChat);

module.exports = Container;

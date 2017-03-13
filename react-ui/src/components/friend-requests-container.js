var React = require('react');
var FriendRequest = require('./friend-request');
var { connect } = require('react-redux');

class FriendRequestsContainer extends React.Component {
    render(props) {
        var incomingRequests = this.props.mainProfile.incomingRequests.map(function(friend, index) {
                return <FriendRequest key={index} type='incoming' username={friend.username} picture={friend.ProfilePicture}></FriendRequest>;
            })
        var outgoingRequests = this.props.mainProfile.outgoingRequests.map(function(friend, index) {
                return <FriendRequest key={index} type='outgoing' username={friend.username} picture={friend.ProfilePicture}></FriendRequest>;
            })    
        return (
            <div>
            <h2>Incoming Requests</h2>
            {incomingRequests}
            <h2>Outgoing Requests</h2>
            {outgoingRequests}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return({
        mainProfile: state.app.mainProfile
    })
}

var Container = connect(mapStateToProps)(FriendRequestsContainer);

module.exports = Container;
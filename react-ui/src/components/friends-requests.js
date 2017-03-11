var React = require('react');

class FriendRequests extends React.Component {
    render(props) {
        var friends = this.props.list.map(function(friend, index) {
                return <li key={index}>{friend.username}</li>;
            })
        return (
            <div>
            {friends}
            </div>
        )
    }
}

module.exports = FriendRequests;
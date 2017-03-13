var React = require('react');
var { connect } = require('react-redux');
const { Panel, Modal, Button, Media } = require('@sketchpixy/rubix');
const actions = require('../actions/index');
const io = require('socket.io-client');

class FriendRequest extends React.Component {
    componentDidMount() {
        this.socket = io();
    }
    cancelRequest() {
        this.props.dispatch(actions.cancelFriendRequest(this.props.username));
        this.socket.emit('cancel-friend-request', this.props.username, this.props.mainProfile.username);
    }
    acceptRequest() {
        this.props.dispatch(actions.confirmFriendRequest(this.props.username));
        this.socket.emit('accept-friend-request', this.props.username, this.props.mainProfile.username);
    }
    denyRequest() {
        this.props.dispatch(actions.denyFriendRequest(this.props.username));
        this.socket.emit('deny-friend-request', this.props.username, this.props.mainProfile.username);
    }
    render(props) {
        var acceptFriendRequestButton = <button onClick={this.acceptRequest.bind(this)}>Accept Friend Request</button>;
        var denyFriendRequestButton = <button onClick={this.denyRequest.bind(this)}>Deny Friend Request</button>;
        var cancelFriendRequestButton = <button onClick={this.cancelRequest.bind(this)}>Cancel Friend Request</button>;
        return (
            <div>
            <Media>
             <Media.Left>
                <img width={64} height={64} src={this.props.picture} alt="Image"/>
              </Media.Left>
              <Media.Body>
                <Media.Heading>{this.props.username}</Media.Heading>
                {(this.props.type === 'incoming') ? (<div>{acceptFriendRequestButton} {denyFriendRequestButton}</div>) : (cancelFriendRequestButton)}
              </Media.Body>
            </Media>
            {this.props.name}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return({
        mainProfile: state.app.mainProfile
    })
}

var Container = connect(mapStateToProps)(FriendRequest);

module.exports = Container;
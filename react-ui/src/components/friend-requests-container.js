const React = require('react');
const FriendRequest = require('./friend-request');
const { connect } = require('react-redux');
const { Panel, Col } = require('react-bootstrap');

class FriendRequestsContainer extends React.Component {
    render(props) {
        var incomingRequests = this.props.mainProfile.incomingRequests.map((friend, index) =>
            <FriendRequest key={index} type='incoming' username={friend.username} picture={friend.ProfilePicture}></FriendRequest>
        )
        var outgoingRequests = this.props.mainProfile.outgoingRequests.map((friend, index) =>
            <FriendRequest key={index} type='outgoing' username={friend.username} picture={friend.ProfilePicture}></FriendRequest>
        )
        var panelStyle = {
            backgroundColor: '#253243',
            color: '#00fff9',
            textAlign: 'center',
            fontFamily: 'Ubuntu',
            fontSize: '1.5em',
            borderRadius: '0',
            borderColor: '#253243'
        }
        var divStyle = {
            backgroundColor: '#ffffff',
            paddingBottom: '20px',
            marginTop: '2.5em',
            borderRadius: '0'
        }
        var textStyle = {
            marginLeft: '10px',
        }
        return (
            <Col xs={12} xsOffset={0} sm={12} smOffset={0} md={10} mdOffset={1} lg={8} lgOffset={2}>
                <div style={divStyle}>
                    <Panel style={panelStyle}>Incoming Requests</Panel>
                    {incomingRequests}
                    {(incomingRequests.length === 0) ? (<h3 style={textStyle}>Your have no incoming friend requests</h3>) : (null)}
                    <Panel style={panelStyle}>Outgoing Requests</Panel>
                    {outgoingRequests}
                    {(outgoingRequests.length === 0) ? (<h3 style={textStyle}>You have not sent any friend requests</h3>) : (null)}
                </div>
            </Col>
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
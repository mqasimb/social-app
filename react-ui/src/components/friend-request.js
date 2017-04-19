const React = require('react');
const { connect } = require('react-redux');
const { Button, Col, Row } = require('react-bootstrap');
const actions = require('../actions/index');
const io = require('socket.io-client');
const router = require('react-router');
const Link = router.Link;

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
        var divSyle={
            paddingTop: '20px',
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px'
        }
        var imageStyle = {
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: '#253243',
            borderRadius: '50%',
        }
        var fontStyle = {
            fontFamily: 'Ubuntu',
            fontSize: '1.25em',
            paddingLeft: '20px',
            fontColor: '#253243'
        }
        var blueButtonStyle = {
            backgroundColor: '#1683ac',
            color: '#ffffff',
            fontFamily: 'UbuntuBold',
            fontSize: '1em',
            borderRadius: '0',
            borderColor: '#1683ac'
        }
        var whiteButtonStyle = {
            backgroundColor: '#ffffff',
            color: '#1683ac',
            fontFamily: 'UbuntuBold',
            fontSize: '1em',
            borderRadius: '0',
            borderColor: '#1683ac'
        }
        var colStyle = {
            paddingTop: '21px',
            textAlign: 'center'
        }
        var acceptFriendRequestButton = <Button style={blueButtonStyle} onClick={this.acceptRequest.bind(this)}>Accept</Button>;
        var denyFriendRequestButton = <Button style={whiteButtonStyle} onClick={this.denyRequest.bind(this)}>Deny</Button>;
        var cancelFriendRequestButton = <Button style={whiteButtonStyle} onClick={this.cancelRequest.bind(this)}>Cancel</Button>;
        return (
            <div style={divSyle}>
                <Row>
                    <Col xs={6} xsOffset={0} sm={4} smOffset={0}>
                        <img style={imageStyle} width={64} height={64} role="presentation" src={this.props.picture} /> <Link style={fontStyle} to={'/profile/'+this.props.username}>{this.props.username}</Link>
                    </Col>
                    <Col style={colStyle} xs={6} xsOffset={0} sm={4} smOffset={4}>
                        {(this.props.type === 'incoming') ? (<div>{acceptFriendRequestButton} {denyFriendRequestButton}</div>) : (cancelFriendRequestButton)}
                    </Col>
                </Row>
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
const React = require('react');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const { Button, Row, Col } = require('react-bootstrap');
const ProfilePicture = require('./profile-picture');
const AboutMe = require('./aboutme');
const ProfilePosts = require('./profile-posts');
const FriendsList = require('./friends-list');
const GamesList = require('./games-list');
const ChangePictureModal = require('./change-picture-modal');
const AboutMeForm = require('./aboutme-form');
const io = require('socket.io-client');
import Wallpaper from '../wallpaper.jpg'

class Profile extends React.Component {
    componentDidMount() {
        this.socket = io();
        this.props.dispatch(actions.getProfile(this.props.params.username))
    }
    changeProfilePicture() {
        this.props.dispatch(actions.postNewProfilePicture(this.props.params.username, {pictureURL: this.props.uploadedProfilePicCloudinaryUrl}))
    }
    changeAboutMe(values) {
        this.props.dispatch(actions.postProfileAboutMe(this.props.params.username, values));
        this.props.dispatch(actions.changeAboutMe(false)); 
    }
    enableAboutMeChange() {
        this.props.dispatch(actions.changeAboutMe(true));
    }
    aboutMeCancelEdit() {
        this.props.dispatch(actions.changeAboutMe(false));   
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.params.username !== nextProps.params.username) {
            this.props.dispatch(actions.getProfile(nextProps.params.username))
        }
    }
    close() {
        this.props.dispatch(actions.changePictureModal(null, false));
        this.props.dispatch(actions.setProfilePicCloudinaryURL(''));
        this.props.dispatch(actions.uploadProfilePic(''));
    }
    open() {
        this.props.dispatch(actions.changePictureModal(this.props.params.username, true))
    }
    addFriend() {
        this.props.dispatch(actions.sendFriendRequest(this.props.params.username, this.props.loadedProfile.ProfilePicture));
        this.socket.emit('friend-request', this.props.params.username, this.props.mainProfile.username, this.props.mainProfile.ProfilePicture)
    }
    cancelRequest() {
        this.props.dispatch(actions.cancelFriendRequest(this.props.params.username));
        this.socket.emit('cancel-friend-request', this.props.params.username, this.props.mainProfile.username);
    }
    acceptRequest() {
        this.props.dispatch(actions.confirmFriendRequest(this.props.params.username));
        this.socket.emit('accept-friend-request', this.props.params.username, this.props.mainProfile.username);
    }
    denyRequest() {
        this.props.dispatch(actions.denyFriendRequest(this.props.params.username));
        this.socket.emit('deny-friend-request', this.props.params.username, this.props.mainProfile.username);
    }
    removeFriend() {
        this.props.dispatch(actions.removeFriendRequest(this.props.params.username));
        this.socket.emit('remove-friend', this.props.params.username, this.props.mainProfile.username);
    }
    render(props) {
        const { auth, mainProfile, loadedProfile, changeAboutMe, postData } = this.props;
        const { username } = this.props.params;

        var profileStyle = {
            paddingTop: '50px',
            backgroundImage: `url(${Wallpaper})`,
            backgroundSize: 'cover',
            overflow: 'hidden',
            textAlign: 'center'
        }
        var buttonStyle = {
            backgroundColor: '#253243',
            color: '#ffffff',
            fontFamily: 'UbuntuBold',
            fontSize: '1em',
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingRight: '30px',
            paddingLeft: '30px',
            borderRadius: '0',
            borderColor: '#00fff9',
            whiteSpace: 'normal'
        }
        var profileNameStyle = {
            fontFamily: 'Ubuntu',
            fontSize: '1.5em',
            color: '#00fff9'
        }
        var rowStyle = {
            paddingBottom: '10px'
        }
        var friendListStyle = {
            minWidth: '290px',
            maxWidth: '400px',
            backgroundColor: '#ffffff',
            marginTop: '20px',
            marginBottom: '20px'
        }
        var acceptFriendRequest = mainProfile.incomingRequests.findIndex((request) =>
            request.username == username
        )
        var cancelFriendRequest = mainProfile.outgoingRequests.findIndex((request) =>
            request.username == username
        )
        var isFriend = mainProfile.Friends.findIndex((request) => 
            request.username == username
        )
        var acceptFriendRequestButton = <Button style={buttonStyle} onClick={this.acceptRequest.bind(this)}>ACCEPT REQUEST</Button>;
        var denyFriendRequestButton = <Button style={buttonStyle} onClick={this.denyRequest.bind(this)}>DENY REQUEST</Button>;
        var cancelFriendRequestButton = <Button style={buttonStyle} onClick={this.cancelRequest.bind(this)}>CANCEL REQUEST</Button>;
        var sendFriendRequestButton = <Button style={buttonStyle} onClick={this.addFriend.bind(this)}>ADD FRIEND</Button>;
        var removeFriendRequestButton = <Button style={buttonStyle} onClick={this.removeFriend.bind(this)}>REMOVE FRIEND</Button>;
        return (
            <div>
                <div className='profile-page-user' style={profileStyle}>
                    <Row style={rowStyle}>
                        <Col xs={6} xsOffset={3} sm={6} smOffset={3}>
                            <ProfilePicture img={loadedProfile.ProfilePicture} onClick={this.open.bind(this)}/>
                            {(auth.user.username == username) ? (<Button style={buttonStyle} onClick={this.open.bind(this)}>CHANGE PICTURE</Button>) : (null)}
                        </Col>
                    </Row>
                    <Row style={rowStyle}>
                        <Col xs={6} xsOffset={3} sm={6} smOffset={3}>
                            <div style={profileNameStyle}>
                                {username}
                            </div>
                        </Col>
                    </Row>
                    <Row style={rowStyle}>
                        <Col xs={6} xsOffset={3} sm={6} smOffset={3}>
                            {(auth.user.username == username) ? (null) : ((acceptFriendRequest > -1) ? (<div>{acceptFriendRequestButton} {denyFriendRequestButton}</div>) : ((isFriend > -1) ? (removeFriendRequestButton) : ((cancelFriendRequest > -1) ? (cancelFriendRequestButton) : (sendFriendRequestButton))))}
                        </Col>
                    </Row>
                    <ChangePictureModal setPicture={this.changeProfilePicture.bind(this)} close={this.close.bind(this)}/>
                    <Row style={rowStyle}>
                        <Col xs={10} xsOffset={1} sm={10} smOffset={1}>
                            <AboutMe text={loadedProfile.AboutMe}/>
                        </Col>
                    </Row>
                    <Row style={rowStyle}>
                        <Col xs={6} xsOffset={3} sm={6} smOffset={3}>
                            {(auth.user.username == username) ? ((changeAboutMe) ? (<AboutMeForm form='AboutMeForm' cancel={this.aboutMeCancelEdit.bind(this)} onSubmit={this.changeAboutMe.bind(this)} initialValues={{aboutMe: loadedProfile.AboutMe}}/>) : (<Button style={buttonStyle} onClick={this.enableAboutMeChange.bind(this)}>EDIT ABOUT ME</Button>)) : (null)}
                        </Col>
                    </Row>
                </div>
                <Col xs={12} xsOffset={0} sm={12} smOffset={0} md={12} mdOffset={0} lg={8} lgOffset={0}>
                    <ProfilePosts posts={postData}/>
                </Col>
                {(loadedProfile.Friends !== undefined) ? (<Col xs={12} xsOffset={0} sm={8} smOffset={3} md={8} mdOffset={3} lg={4} lgOffset={0}><div style={friendListStyle}><FriendsList list={loadedProfile.Friends}/></div></Col>) : (null)}
                {(loadedProfile.favoriteGames !== undefined) ? (<Col xs={12} xsOffset={0} sm={8} smOffset={3} md={8} mdOffset={3} lg={4} lgOffset={0}><div style={friendListStyle}><GamesList list={loadedProfile.favoriteGames}/></div></Col>) : (null)}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        postData: state.app.postData,
        loadedProfile: state.app.loadedProfile,
        mainProfile: state.app.mainProfile,
        changeAboutMe: state.app.changeAboutMe,
        uploadedProfilePicCloudinaryUrl: state.app.uploadedProfilePicCloudinaryUrl
    })
}
var Container = connect(mapStateToProps)(Profile);

module.exports = Container;

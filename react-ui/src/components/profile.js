var React = require('react');
const ReactDOM = require('react-dom');
var { connect } = require('react-redux');
const Content = require('./content');
const { Link } = require('react-router');
const LikeBox = require('./likebox');
const actions = require('../actions/index');
const router = require('react-router');
const { Panel, Modal, Button } = require('@sketchpixy/rubix');
const ProfilePicture = require('./profile-picture');
const AboutMe = require('./aboutme');
const ProfilePosts = require('./profile-posts');
const FriendsList = require('./friends-list');
const ChangePictureModal = require('./change-picture-modal');
const Dropzone = require('react-dropzone');
const request = require('superagent');
const AboutMeForm = require('./aboutme-form');

class Profile extends React.Component {
    componentDidMount() {
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
    close() {
        this.props.dispatch(actions.changePictureModal(null, false));
        this.props.dispatch(actions.setProfilePicCloudinaryURL(''));
        this.props.dispatch(actions.uploadProfilePic(''));
    }
    open() {
        this.props.dispatch(actions.changePictureModal(this.props.params.username, true))
    }
    addFriend() {
        this.props.dispatch(actions.sendFriendRequest(this.props.params.username))
    }
    cancelRequest() {
        this.props.dispatch(actions.cancelFriendRequest(this.props.params.username))
    }
    acceptRequest() {
        this.props.dispatch(actions.confirmFriendRequest(this.props.params.username))
    }
    denyRequest() {
        this.props.dispatch(actions.denyFriendRequest(this.props.params.username))
    }
    removeFriend() {
        this.props.dispatch(actions.removeFriendRequest(this.props.params.username))
    }
    render(props) {
        var acceptFriendRequest = this.props.mainProfile.incomingRequests.findIndex((request) => {
            return request.username == this.props.params.username;
        });
        var denyFriendRequest = acceptFriendRequest;
        var cancelFriendRequest = this.props.mainProfile.outgoingRequests.findIndex((request) => {
            return request.username == this.props.params.username;
        });
        var isFriend = this.props.mainProfile.Friends.findIndex((request) => {
            return request.username == this.props.params.username;
        });
        var sendFriendRequest = (((acceptFriendRequest > -1) || (cancelFriendRequest > -1)) && (isFriend < 0)) ? (false) : (true);
        var acceptFriendRequestButton = <button onClick={this.acceptRequest.bind(this)}>Accept Friend Request</button>;
        var denyFriendRequestButton = <button onClick={this.denyRequest.bind(this)}>Deny Friend Request</button>;
        var cancelFriendRequestButton = <button onClick={this.cancelRequest.bind(this)}>Cancel Friend Request</button>;
        var sendFriendRequestButton = <button onClick={this.addFriend.bind(this)}>Add Friend</button>;
        var removeFriendRequestButton = <button onClick={this.removeFriend.bind(this)}>Remove Friend</button>;
        return (
            <div>
            <ProfilePicture img={this.props.loadedProfile.ProfilePicture} onClick={this.open.bind(this)}/>
            {(this.props.auth.user.username == this.props.params.username) ? (null) : ((acceptFriendRequest > -1) ? (<div>{acceptFriendRequestButton} {denyFriendRequestButton}</div>) : ((isFriend > -1) ? (<div>Friends {removeFriendRequestButton}</div>) : ((cancelFriendRequest > -1) ? (cancelFriendRequestButton) : (sendFriendRequestButton))))}
            {(this.props.auth.user.username == this.props.params.username) ? (<button onClick={this.open.bind(this)}>Change Profile Pic</button>) : (null)}
            <ChangePictureModal setPicture={this.changeProfilePicture.bind(this)} close={this.close.bind(this)}/>
            <AboutMe text={this.props.loadedProfile.AboutMe}/>
            {(this.props.auth.user.username == this.props.params.username) ? ((this.props.changeAboutMe) ? (<AboutMeForm form='AboutMeForm' cancel={this.aboutMeCancelEdit.bind(this)} onSubmit={this.changeAboutMe.bind(this)} initialValues={{aboutMe: this.props.loadedProfile.AboutMe}}/>) : (<button onClick={this.enableAboutMeChange.bind(this)}>Change About Me</button>)) : (null)}
            <ProfilePosts posts={this.props.postData}/>
            <FriendsList list={[{name:'Harry'}, {name:'Hermione'}, {name:'Ron'}]}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        isEdit: state.app.isEdit,
        postData: state.app.postData,
        commentsInput: state.app.commentsInput,
        loadedProfile: state.app.loadedProfile,
        mainProfile: state.app.mainProfile,
        changeAboutMe: state.app.changeAboutMe,
        uploadedProfilePicCloudinaryUrl: state.app.uploadedProfilePicCloudinaryUrl
    })
}
var Container = connect(mapStateToProps)(Profile);

module.exports = Container;

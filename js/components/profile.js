var React = require('react');
const ReactDOM = require('react-dom');
var { connect } = require('react-redux');
const Content = require('./content');
const { Link } = require('react-router');
const LikeBox = require('./likebox');
const actions = require('../actions/index');
const router = require('react-router');
const { Panel, Modal, Button } = require('react-bootstrap');
const ProfilePicture = require('./profile-picture');
const AboutMe = require('./aboutme');
const ProfilePosts = require('./profile-posts');
const FriendsList = require('./friends-list');
const ChangePictureModal = require('./change-picture-modal');
const Dropzone = require('react-dropzone');
const request = require('superagent');

class Profile extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.getProfile(this.props.params.username))
    }
    changeProfilePicture() {
        this.props.dispatch(actions.postNewProfilePicture(this.props.params.username, {pictureURL: this.props.uploadedProfilePicCloudinaryUrl}))
    }
    close() {
        this.props.dispatch(actions.changePictureModal(null, false));
        this.props.dispatch(actions.setProfilePicCloudinaryURL(''));
        this.props.dispatch(actions.uploadProfilePic(''));
    }
    open() {
        this.props.dispatch(actions.changePictureModal(this.props.params.username, true))
    }
    render(props) {
        return (
            <div>
            <ProfilePicture img={this.props.loadedProfile.ProfilePicture} onClick={this.open.bind(this)}/>
            <button onClick={this.open.bind(this)}>Change Profile Pic</button>
            <ChangePictureModal setPicture={this.changeProfilePicture.bind(this)} close={this.close.bind(this)}/>
            <AboutMe text='Hi I am a very cool person! Add me as a friend to learn more about me!'/>
            <ProfilePosts posts={[{content: 'abc', username:'1'}, {content: 'cde', username:'1'}, {content: '123', username:'1'}]}/>
            <FriendsList list={[{name:'Harry'}, {name:'Hermione'}, {name:'Ron'}]}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        isEdit: state.app.isEdit,
        commentsInput: state.app.commentsInput,
        loadedProfile: state.app.loadedProfile,
        uploadedProfilePicCloudinaryUrl: state.app.uploadedProfilePicCloudinaryUrl
    })
}
var Container = connect(mapStateToProps)(Profile);

module.exports = Container;

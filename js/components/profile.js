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

class Profile extends React.Component {
    render(props) {
        return (
            <div>
            <ProfilePicture img='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png' />
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
        showModal: state.app.showModal
    })
}
var Container = connect(mapStateToProps)(Profile);

module.exports = Container;

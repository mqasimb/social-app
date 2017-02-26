var React = require('react');
const ReactDOM = require('react-dom');
var { connect } = require('react-redux');
const Content = require('./content');
const { Link } = require('react-router');
const LikeBox = require('./likebox');
const actions = require('../actions/index');
const CommentList = require('./commentlist');
const router = require('react-router');
const CommentForm = require('./comment-form');
const { Panel, Modal, Button } = require('react-bootstrap');
const { reset } = require('redux-form');
const uuid = require('uuid');
const DeleteModal = require('./delete-modal');

class Post extends React.Component {
    likeBoxClick(event) {
        event.preventDefault();
        this.props.dispatch(actions.updateLikeStatus(this.props.id));
    }
    deleteClick(event) {
        event.preventDefault();
        console.log(this.props.content)
        this.props.dispatch(actions.deletePost(this.props.showModal.postID));
        this.props.dispatch(actions.toggleModal(null, false));
    }
    editClick(event) {
        event.preventDefault();
        this.props.dispatch(actions.editPostEnable());
        router.browserHistory.push('/post/'+this.props.id);
    }
    commentInput(event) {
        this.props.dispatch(actions.commentInputChange(event.target.name, event.target.value))
    }
    submitComment(values) {
        this.props.dispatch(actions.submitComment(this.props.id, values))
        this.props.dispatch(reset(this.props.id));
    }
    close() {
        this.props.dispatch(actions.toggleModal(null, false));
    }
    open() {
        this.props.dispatch(actions.toggleModal(this.props.id, true));
    }
    render(props) {
        var deleteButton = <button onClick={this.open.bind(this)}>Delete Post</button>;
        var confirmDelete = <button onClick={this.deleteClick.bind(this)}>Delete Post</button>;
        var editButton = <button onClick={this.editClick.bind(this)}>Edit Post</button>;
        var isDelete = (this.props.name === this.props.auth.user.username) ? (deleteButton) : (null);
        var isEdit = (this.props.name === this.props.auth.user.username) ? (editButton) : (null);
        var imageStyle = {
            width: 200,
            height: 200
        }
        var image = (this.props.image) ? (<img src={this.props.image} style={imageStyle}/>) : (null)
        return (
            <div>
            <Panel>
            <Link to={'/post/'+this.props.id}><Content content={this.props.content}/></Link>{this.props.name}
            {image}
            </Panel>
            <LikeBox username={this.props.auth.user._id} likes={this.props.likes} onClick={this.likeBoxClick.bind(this)}/>
            {isEdit}
            {isDelete}
            <DeleteModal key={uuid.v4()} delete={this.deleteClick.bind(this)} close={this.close.bind(this)}/>
            Comments
            <CommentList comments={this.props.comments}/>
            <CommentForm onSubmit={this.submitComment.bind(this)} form={this.props.id}/>
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
var Container = connect(mapStateToProps)(Post);

module.exports = Container;

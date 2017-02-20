var React = require('react');
const ReactDOM = require('react-dom');
var { connect } = require('react-redux');
const Content = require('./content');
const { Link } = require('react-router');
const LikeBox = require('./likebox');
const actions = require('../actions/index');
const CommentList = require('./commentlist');
const router = require('react-router');

class Post extends React.Component {
    likeBoxClick(event) {
        event.preventDefault();
        this.props.dispatch(actions.updateLikeStatus(this.props.id));
    }
    deleteClick(event) {
        event.preventDefault();
        this.props.dispatch(actions.deletePost(this.props.id));
    }
    editClick(event) {
        event.preventDefault();
        this.props.dispatch(actions.editPostEnable());
        router.browserHistory.push('/post/'+this.props.id);
    }
    commentInput(event) {
        this.props.dispatch(actions.commentInputChange(event.target.name, event.target.value))
    }
    submitComment(event) {
        event.preventDefault();
        this.props.dispatch(actions.submitComment(this.props.id, {comment: this.props.commentsInput[this.props.id]}))
    }
    render(props) {
        var deleteButton = <button onClick={this.deleteClick.bind(this)}>Delete Post</button>;
        var editButton = <button onClick={this.editClick.bind(this)}>Edit Post</button>;
        var isDelete = (this.props.name === this.props.auth.user.username) ? (deleteButton) : (null);
        var isEdit = (this.props.name === this.props.auth.user.username) ? (editButton) : (null);
        var image = (this.props.image) ? (<img src={this.props.image}/>) : (null)
        return (
            <div>
            <Link to={'/post/'+this.props.id}><Content content={this.props.content}/></Link>{this.props.name}
            {image}
            <LikeBox likes={this.props.likes} onClick={this.likeBoxClick.bind(this)}/>
            {isEdit}
            {isDelete}
            Comments
            <CommentList comments={this.props.comments}/>
            <form onSubmit={this.submitComment.bind(this)}>
            <label>Comment</label>
            <input type='text' name={this.props.id} onChange={this.commentInput.bind(this)} ref='inputComment' value={this.props.commentsInput[this.props.id] || ''}/>
            <button disabled={!this.props.commentsInput[this.props.id]}>Submit Comment</button>
            </form>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.auth,
        isEdit: state.isEdit,
        commentsInput: state.commentsInput
    })
}
var Container = connect(mapStateToProps)(Post);

module.exports = Container;

var React = require('react');
var moment = require('moment');
const { ListGroupItem } = require('react-bootstrap');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const router = require('react-router');
const EditCommentForm = require('./edit-comment-form');

class Comment extends React.Component {
    deleteClick(event) {
        event.preventDefault();
        this.props.dispatch(actions.deleteComment(this.props.id));
    }
    editComment(values) {
        this.props.dispatch(actions.editComment(this.props.post, this.props.id, values));
    }
    submitEdit(event) {
        event.preventDefault();
        this.props.dispatch(actions.submitEdittedPost(this.props.params.id, this.props.editInput)).then((response)  =>{
            this.props.dispatch(actions.getSinglePost(this.props.params.id));
            this.props.dispatch(actions.editPostDisable());
        })
    }
    cancelEdit(event) {
        event.preventDefault();
        this.props.dispatch(actions.toggleEditComment(this.props.id, false));
    }
    enableEdit(event) {
        event.preventDefault();
        this.props.dispatch(actions.toggleEditComment(this.props.id, true));
    }
    render(props) {
      var deleteButton = <button onClick={this.deleteClick.bind(this)}>Delete Post</button>;
      var editButton = <button onClick={this.enableEdit.bind(this)}>Edit Post</button>;
      var isDelete = (this.props.username === this.props.auth.user.username) ? (deleteButton) : (null);
      var isEdit = (this.props.username === this.props.auth.user.username) ? (editButton) : (null);
      var notEdit = <ListGroupItem>{this.props.username}: {this.props.comment}  -{this.props.date} {isEdit} {isDelete}</ListGroupItem>;
      var editOn = <ListGroupItem><EditCommentForm form={this.props.id} onSubmit={this.editComment.bind(this)} cancel={this.cancelEdit.bind(this)} initialValues={{comment: this.props.comment}} /></ListGroupItem>;
        return (
            <div>
            {(this.props.editComment[this.props.id]) ? (editOn) : (notEdit)}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
  return({
    auth: state.app.auth,
    editComment: state.app.editComment 
  })
}

var Container = connect(mapStateToProps)(Comment);

module.exports = Container;

var React = require('react');
var moment = require('moment');
const { ListGroupItem } = require('react-bootstrap');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const router = require('react-router');

class Comment extends React.Component {
    deleteClick(event) {
        event.preventDefault();
        this.props.dispatch(actions.deletePost(this.props.id));
        this.props.dispatch(actions.toggleModal(false));
    }
    editClick(event) {
        event.preventDefault();
        this.props.dispatch(actions.editPostEnable());
        router.browserHistory.push('/post/'+this.props.id);
    }
    deleteClick(event) {
        event.preventDefault();
        this.props.dispatch(actions.deleteComment(this.props.id));
    }
    editInput(event) {
        event.preventDefault();
        this.props.dispatch(actions.editInput(event.target.name, event.target.value));
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
        this.props.dispatch(actions.editPostDisable());
    }
    enableEdit(event) {
        event.preventDefault();
        this.props.dispatch(actions.toggleEditComment(this.props.id, true));
    }
    render(props) {
      var deleteButton = <button onClick={this.editInput.bind(this)}>Delete Post</button>;
      var editButton = <button onClick={this.enableEdit.bind(this)}>Edit Post</button>;
      var isDelete = (this.props.username === this.props.auth.user.username) ? (deleteButton) : (null);
      var isEdit = (this.props.username === this.props.auth.user.username) ? (editButton) : (null);
      var notEdit = <ListGroupItem>{this.props.username}: {this.props.comment}  -{this.props.date} {isEdit} {isDelete}</ListGroupItem>;
      var editOn = <ListGroupItem><input type='text' name='comment' value={this.props.comment} /></ListGroupItem>;
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

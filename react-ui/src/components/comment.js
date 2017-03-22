const React = require('react');
const moment = require('moment');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const router = require('react-router');
const EditCommentForm = require('./edit-comment-form');
const { ListGroupItem, Panel, Modal, Button, Media } = require('react-bootstrap');

import PencilEditButton from '../icons/pencil-edit-button.svg'
import DeleteButton from '../icons/cancel.svg'

class Comment extends React.Component {
    deleteClick(event) {
        event.preventDefault();
        this.props.dispatch(actions.deleteComment(this.props.post, this.props.id));
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
      var editButtonStyle = {
            height: '10px',
            paddingRight: '5px'
      }
      var buttondivStyle = {
            display: 'inline-block',
            fontSize: '.85em'
      }
      var dateStyle = {
            fontSize: '0.85em'
      }
      var deleteButton = <div style={buttondivStyle} onClick={this.deleteClick.bind(this)}><img style={editButtonStyle} src={DeleteButton} />Delete</div>;
      var editButton = <div style={buttondivStyle} onClick={this.enableEdit.bind(this)}><img style={editButtonStyle} src={PencilEditButton} />Edit</div>;
      var isDelete = (this.props.username === this.props.auth.user.username) ? (deleteButton) : (null);
      var isEdit = (this.props.username === this.props.auth.user.username) ? (editButton) : (null);
      var notEdit = <ListGroupItem>{this.props.username}: {this.props.comment}  -{this.props.date} {isEdit} {isDelete}</ListGroupItem>;
      var editOn = <ListGroupItem><EditCommentForm form={this.props.id} onSubmit={this.editComment.bind(this)} cancel={this.cancelEdit.bind(this)} initialValues={{comment: this.props.comment}} /></ListGroupItem>;
        return (
            <div>
            {(this.props.editComment[this.props.id]) ? (editOn) : (<Media>
             <Media.Left>
                <img width={64} height={64} src={this.props.profilePicture} alt="Image"/>
              </Media.Left>
              <Media.Body>
                <Media.Heading>{this.props.username}</Media.Heading>
                <span style={dateStyle}>{this.props.date}</span><br/>
                <span className="comment-buttons">{isEdit} {isDelete}</span>
                <p>{this.props.comment}</p>
              </Media.Body>
            </Media>)}
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

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

class DeleteModal extends React.Component {
    render(props) {
        var confirmDelete = <Button onClick={this.props.delete.bind(this)}>Delete Post</Button>;
        return (
            <div>
        <Modal show={this.props.showModal.toggle} onHide={this.props.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Post Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Would you like to delete this post?.</p>
          </Modal.Body>
          <Modal.Footer>
            {confirmDelete}
            <Button onClick={this.props.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        showModal: state.app.showModal
    })
}
var Container = connect(mapStateToProps)(DeleteModal);

module.exports = Container;

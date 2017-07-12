const React = require('react');
const { connect } = require('react-redux');
const Content = require('./content');
const { Link } = require('react-router');
const LikeBox = require('./likebox');
const actions = require('../actions/index');
const CommentList = require('./commentlist');
const CommentForm = require('./comment-form');
const { Media, ListGroupItem, Modal, Button } = require('react-bootstrap');
const { reset } = require('redux-form');
const uuid = require('uuid');
const DeleteModal = require('./delete-modal');
const moment = require('moment');
const EditPostForm = require('./edit-post-form');

import PencilEditButton from '../icons/pencil-edit-button.svg'
import DeleteButton from '../icons/cancel.svg'

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageModal: false
        }
    }
    likeBoxClick(event) {
        event.preventDefault();
        this.props.dispatch(actions.updateLikeStatus(this.props.id, this.props.auth.user._id));
    }
    deleteClick(event) {
        event.preventDefault();
        console.log(this.props.content)
        this.props.dispatch(actions.deletePost(this.props.showModal.postID));
        this.props.dispatch(actions.toggleModal(null, false));
    }
    cancelEdit(event) {
        event.preventDefault();
        this.props.dispatch(actions.toggleEditPost(this.props.id, false));
    }
    enableEdit(event) {
        event.preventDefault();
        this.props.dispatch(actions.toggleEditPost(this.props.id, true));
    }
    editPost(values) {
        this.props.dispatch(actions.submitEdittedPost(this.props.id, values)).then((response)  =>{
            this.props.dispatch(actions.toggleEditPost(this.props.id, false));
            this.props.dispatch(actions.editPostSuccessful(this.props.id, values));
        })
    }
    commentInput(event) {
        this.props.dispatch(actions.commentInputChange(event.target.name, event.target.value))
    }
    submitComment(values) {
        this.props.dispatch(actions.submitComment(this.props.id, values))
        this.props.dispatch(reset(this.props.id));
    }
    openImageModal() {
        this.setState({
            imageModal: true
        })
    }
    closeImage() {
        this.setState({
            imageModal: false
        })   
    }
    close() {
        this.props.dispatch(actions.toggleModal(null, false));
    }
    open() {
        this.props.dispatch(actions.toggleModal(this.props.id, true));
    }
    render(props) {
        var editButtonStyle = {
            height: '15px',
            paddingRight: '5px'
        }
        var buttondivStyle = {
            display: 'inline-block',
            marginLeft: '20px',
            fontSize: '.75em',
            cursor: 'pointer'
        }
        var deleteButton = <div style={buttondivStyle} onClick={this.open.bind(this)}><img style={editButtonStyle} role="presentation" src={DeleteButton} />Delete</div>;
        var editButton = <div style={buttondivStyle}  onClick={this.enableEdit.bind(this)}><img style={editButtonStyle} role="presentation" src={PencilEditButton} />Edit</div>;
        var isDelete = (this.props.name === this.props.auth.user.username) ? (deleteButton) : (null);
        var isEdit = (this.props.name === this.props.auth.user.username) ? (editButton) : (null);
        var editOn = <ListGroupItem><EditPostForm form={this.props.id} onSubmit={this.editPost.bind(this)} cancel={this.cancelEdit.bind(this)} initialValues={{content: this.props.content}} /></ListGroupItem>;

        var postStyle={
            backgroundColor: '#FFFFFF',
            maxWidth: '1000px',
            margin: '20px auto',
            padding: '20px'
        }
        var postImageStyle = {
            paddingTop: '20px',
            maxWidth: '500px',
            width: '100%',
            padding: '1px',
            borderStyle: 'solid',
            borderColor: '#00fff9',
            borderWidth: '1px'
        }
        var image = (this.props.image) ? (<img style={postImageStyle} onClick={this.openImageModal.bind(this)} role="presentation" src={this.props.image}/>) : (null)
        return (
            <div className='singlePost' style={postStyle}>
                {(this.props.editPost[this.props.id]) ? (editOn) : (
                <Media>
                    <Media.Left>
                        <img width={64} height={64} role="presentation" src={this.props.profilePicture}/>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading><Link to={'/profile/'+this.props.name}>{this.props.name}</Link>
                            {isEdit}
                            {isDelete}
                        </Media.Heading>
                        <p>{moment(this.props.date).format('MMMM Do YYYY, h:mm a')}</p>
                        <Content content={this.props.content}/>
                        {image}
                        <Modal show={this.state.imageModal} onHide={this.closeImage.bind(this)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Please upload new picture</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <img style={{width: '100%'}} onClick={this.openImageModal.bind(this)} role="presentation" src={this.props.image}/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.closeImage.bind(this)}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                        <LikeBox username={this.props.auth.user._id} likes={this.props.likes} onClick={this.likeBoxClick.bind(this)}/>
                        <DeleteModal key={uuid.v4()} delete={this.deleteClick.bind(this)} close={this.close.bind(this)}/>
                        <CommentForm onSubmit={this.submitComment.bind(this)} form={this.props.id}/>
                        {(this.props.comments.length > 0) ? (<h2>Comments</h2>) : (null)}
                        <CommentList comments={this.props.comments}/>
                    </Media.Body>
                </Media>)}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        isEdit: state.app.isEdit,
        commentsInput: state.app.commentsInput,
        showModal: state.app.showModal,
        editPost: state.app.editPost
    })
}
var Container = connect(mapStateToProps)(Post);

module.exports = Container;

const React = require('react');
const { connect } = require('react-redux');
const Comment = require('./comment');
const { ListGroup } = require('react-bootstrap');
const uuid = require('uuid');
const moment = require('moment');

class CommentList extends React.Component {
    render(props) {
        var comments = this.props.comments.map((comment) =>
            <Comment post={comment.post} key={uuid.v1()} profilePicture={comment.profile.ProfilePicture} id={comment._id} username={comment.username} comment={comment.comment} date={moment(comment.date).format('MMMM Do YYYY, h:mm a')} />
        )
        return (
            <div>
                <ListGroup>{comments}</ListGroup>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        auth: state.app.auth,
        isEdit: state.app.isEdit,
        commentsInput: state.app.commentsInput
    })
}
var Container = connect(mapStateToProps)(CommentList);

module.exports = Container;

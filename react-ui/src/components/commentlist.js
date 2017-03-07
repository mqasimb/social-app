var React = require('react');
var { connect } = require('react-redux');
const Content = require('./content');
const { Link } = require('react-router');
const LikeBox = require('./likebox');
const actions = require('../actions/index')
const Comment = require('./comment');
const { ListGroup } = require('@sketchpixy/rubix');
const uuid = require('uuid');
var moment = require('moment');

class CommentList extends React.Component {
    render(props) {
        var comments = this.props.comments.map(function(comment) {
            return <Comment post={comment.post} key={uuid.v1()} id={comment._id} username={comment.username} comment={comment.comment} date={moment(comment.date).format('MMMM Do YYYY, h:mm a')} />;
        })
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
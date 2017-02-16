var React = require('react');
var { connect } = require('react-redux');
const Content = require('./content');
const { Link } = require('react-router');
const LikeBox = require('./likebox');
const actions = require('../actions/index')
const Comment = require('./comment');

class CommentList extends React.Component {
    render(props) {
        console.log(this.props.comments)
        var comments = this.props.comments.map(function(comment) {
            return <Comment key={comment._id} username={comment.username} comment={comment.comment} date={comment.date} />;
        })
        console.log(comments);
        return (
            <div>
            <ul>{comments}</ul>
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
var Container = connect(mapStateToProps)(CommentList);

module.exports = Container;

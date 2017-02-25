var React = require('react');
var moment = require('moment');
const { ListGroupItem } = require('react-bootstrap');

class Comment extends React.Component {
    render(props) {
        return (
            <div>
            <ListGroupItem>{this.props.username}: {this.props.comment}  -{this.props.date}</ListGroupItem>
            </div>
        )
    }
}

module.exports = Comment;

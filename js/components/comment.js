var React = require('react');

class Comment extends React.Component {
    render(props) {
        return (
            <div>
            <li>{this.props.username}: {this.props.comment}  -{this.props.date}</li>
            </div>
        )
    }
}

module.exports = Comment;
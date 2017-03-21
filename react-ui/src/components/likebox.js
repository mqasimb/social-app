var React = require('react');
var { Button, Badge } = require('react-bootstrap');

class LikeBox extends React.Component {
    render() {
        var LikeButton = <Button bsStyle='info' onClick={this.props.onClick}>Like</Button>;
        var LikedButton = <Button bsStyle='primary' onClick={this.props.onClick}>Liked</Button>;
        var isLiked = this.props.likes.findIndex((item) => {
            return item.username === this.props.username;
        })
        return(
            <div>
            {(isLiked > -1) ? (LikedButton) : (LikeButton)}
            <Badge>{this.props.likes.length}</Badge>
            </div>
            )
    }
}

module.exports = LikeBox;
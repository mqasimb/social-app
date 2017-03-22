var React = require('react');
var { Button, Badge } = require('react-bootstrap');

class LikeBox extends React.Component {
    render() {
        var blueButtonStyle = {
            backgroundColor: '#1683ac',
            color: '#ffffff',
            fontFamily: 'UbuntuBold',
            fontSize: '1em',
            borderRadius: '0',
            borderColor: '#1683ac'
        }
        var whiteButtonStyle = {
            backgroundColor: '#ffffff',
            color: '#1683ac',
            fontFamily: 'UbuntuBold',
            fontSize: '1em',
            borderRadius: '0',
            borderColor: '#1683ac'
        }
        var LikeButton = <Button style={whiteButtonStyle} onClick={this.props.onClick}>Like</Button>;
        var LikedButton = <Button style={blueButtonStyle} onClick={this.props.onClick}>Liked</Button>;
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
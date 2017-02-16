var React = require('react');

class LikeBox extends React.Component {
    render() {
        return(
            <div>
            <button onClick={this.props.onClick}>Like</button>
            {this.props.likes.length}
            </div>
            )
    }
}

module.exports = LikeBox;
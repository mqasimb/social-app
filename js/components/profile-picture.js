var React = require('react');

class ProfilePicture extends React.Component {
    render(props) {
        return (
            <div>
            <img src={this.props.img}/>
            </div>
        )
    }
}

module.exports = ProfilePicture;

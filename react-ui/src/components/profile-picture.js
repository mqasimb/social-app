var React = require('react');

class ProfilePicture extends React.Component {
    render(props) {
    	var pictureStyle = {
    		maxWidth: '300px',
            width: '100%',
			padding: '1px',
			borderStyle: 'solid',
			borderColor: '#00fff9',
    		borderWidth: '1px'
    	}
        return (
            <div>
            <img style={pictureStyle} role="presentation" src={this.props.img}/>
            </div>
        )
    }
}

module.exports = ProfilePicture;

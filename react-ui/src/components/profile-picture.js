var React = require('react');

class ProfilePicture extends React.Component {
    render(props) {
    	var pictureStyle = {
    		height: '300px',
    		width: '300px',
			padding: '1px',
			borderStyle: 'solid',
			borderColor: '#00fff9',
    		borderWidth: '1px'
    	}
        return (
            <div>
            <img style={pictureStyle} src={this.props.img}/>
            </div>
        )
    }
}

module.exports = ProfilePicture;

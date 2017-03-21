var React = require('react');

class AboutMe extends React.Component {
    render(props) {
    	var aboutMeStyle = {
            fontFamily: 'Ubuntu',
            fontSize: '1em',
            color: '#ffffff',
            textAlign: 'center'
        }
        return (
            <div style={aboutMeStyle}>
            <p>{this.props.text}</p>
            </div>
        )
    }
}

module.exports = AboutMe;

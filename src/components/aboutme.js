var React = require('react');

class AboutMe extends React.Component {
    render(props) {
        return (
            <div>
            <p>{this.props.text}</p>
            </div>
        )
    }
}

module.exports = AboutMe;

const React = require('react');

class Game extends React.Component {
    render(props) {
        var imageStyle = {
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: '#253243',
            borderRadius: '50%',
        }
        var fontStyle = {
            fontFamily: 'Ubuntu',
            fontSize: '1em',
            paddingLeft: '20px',
            fontColor: '#253243'
        }
        var paddingStyle = {
            paddingBottom: '15px'
        }
        return (
            <div style={paddingStyle}>
                <img style={imageStyle} width={64} height={64} role="presentation" src={this.props.cover} /><span style={fontStyle}>{this.props.name}</span>
            </div>
        )
    }
}

module.exports = Game;
const React = require('react');

class Content extends React.Component {
    render() {
        return(
            <div>
            	{this.props.content}
            </div>
        )
    }
}

module.exports = Content;
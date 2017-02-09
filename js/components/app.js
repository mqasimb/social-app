const React = require('react');

class App extends React.Component {
    
    render(props) {
        return (
            <div>
            {this.props.children}
            </div>
            )
    }
}

module.exports = App;
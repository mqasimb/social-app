var React = require('react');
const GameSearch = require('./game-search');

class Games extends React.Component {
    render() {
        return(
            <div>
            <GameSearch />
            </div>
            )
    }
}

module.exports = Games;
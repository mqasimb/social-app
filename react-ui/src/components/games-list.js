var React = require('react');
const Game = require('./game');
const { Panel } = require('react-bootstrap');

class GamesList extends React.Component {
    render(props) {
        var panelStyle = {
            backgroundColor: '#253243',
            color: '#00fff9',
            textAlign: 'center',
            fontFamily: 'Ubuntu',
            fontSize: '1.5em',
            borderRadius: '0',
            borderColor: '#253243'
        }
        var paddingStyle = {
            paddingLeft: '40px',
            paddingBottom: '40px',
            paddingTop: '20px'
        }
        var games = this.props.list.map((game, index) =>
                <Game key={index} id={game.id} name={game.name} cover={game.cover}/>
        )
        return (
            <div className='game-list'>
                <Panel style={panelStyle}>Games - {this.props.list.length}</Panel>
                <div style={paddingStyle}>
                    {games}
                </div>
            </div>
        )
    }
}

module.exports = GamesList;
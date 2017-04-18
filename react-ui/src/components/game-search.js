const React = require('react');
const axios = require('axios');
const router = require('react-router');
const Link = router.Link;
const actions = require('../actions/index');
const GameSearchForm = require('./game-search-form');
const { ControlLabel, Button, Col, Row } = require('react-bootstrap');
const { connect } = require('react-redux');

class GameSearch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {options: []}
  }
  _handleSearch(values) {
    axios.get(`/api/game/search/${values.search}`)
      .then(resp => resp)
      .then(json => {
        return this.setState({options: json.data})})
  }
  likeGame(name, id, cover) {
    axios.post('/api/games/like', {name: name, id: id, cover: cover})
    .then(resp => resp)
    .then(json => {console.log(json.data)
        this.props.dispatch(actions.likeGame(json.data));
      })
  }
  render() {
    var listStyle = {
      maxWidth: '500px',
      minWidth: '300px',
      margin: '0 auto',
      paddingTop: '10px',
      paddingBottom: '10px'
    }
    var divStyle = {
      backgroundColor: '#ffffff',
      paddingTop: '40px',
      paddingBottom: '40px'
    }
    var textStyle = {
      paddingLeft: '5px'
    }
    var blueButtonStyle = {
      backgroundColor: '#1683ac',
      color: '#ffffff',
      fontFamily: 'UbuntuBold',
      fontSize: '1em',
      borderRadius: '0',
      width: '62px',
      borderColor: '#1683ac'
    }
    var whiteButtonStyle = {
      backgroundColor: '#ffffff',
      color: '#1683ac',
      fontFamily: 'UbuntuBold',
      fontSize: '1em',
      borderRadius: '0',
      width: '62px',
      borderColor: '#1683ac'
    }
    var imageStyle = {
      paddingLeft: '20px'
    }
    var games = this.state.options.map((game, index) => {
      var data = this.props.mainProfile.favoriteGames.find((favoriteGame) => { 
          return favoriteGame.id === game.id;
      });
      return <div style={listStyle} key={index}>{(data) ? (<Button style={blueButtonStyle} onClick={this.likeGame.bind(this, game.name, game.id, game.cover.url)}>Liked</Button>) : (<Button style={whiteButtonStyle} onClick={this.likeGame.bind(this, game.name, game.id, game.cover.url)}>Like</Button>)}<img style={imageStyle} width={64} height={64} role="presentation" src={game.cover.url}/><span style={textStyle}>{game.name}</span></div>
    }
  )
    return (
      <div>
      <Row><Col componentClass={ControlLabel} xsOffset={1} smOffset={1} mdOffset={2} xs={6} sm={6}>
      </Col></Row>
      <GameSearchForm form="GameSearchForm" onSubmit={this._handleSearch.bind(this)}/>
      {(games.length > 0) ? (<div style={divStyle}>
      {games}</div>) : (null)}
      </div>

    )
  }
}

function mapStateToProps(state, props) {
  return({
      mainProfile: state.app.mainProfile
  })
}

var Container = connect(mapStateToProps)(GameSearch);

module.exports = Container;
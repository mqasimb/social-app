const AsyncTypeahead = require('react-bootstrap-typeahead').AsyncTypeahead;
const React = require('react');
const axios = require('axios');
const router = require('react-router');
const Link = router.Link;
const apikeys = require('../../../apikeys');
const actions = require('../actions/index');
const GameSearchForm = require('./game-search-form');
const { FormGroup, FormControl, ControlLabel, Panel, Modal, Button, Col, Row } = require('react-bootstrap');
const { connect } = require('react-redux');

class GameSearch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {options: []}
  }
  _handleSearch(values) {
    axios.get(`https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&limit=50&offset=0&search=${values.search}&filter[cover.url][exists]`,
      {headers: {'X-Mashape-Key': apikeys.IGDB_API_KEY, 'Accept': 'application/json'}}
      )
      .then(resp => resp)
      .then(json => {console.log(json.data)
        return this.setState({options: json.data})})
  }
  likeGame(name, id, cover) {
    console.log(name, id, cover)
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
    var imgStyle = {width: 100, height: 100}
    var games = this.state.options.map((game, index) => {
      var data = this.props.mainProfile.favoriteGames.find((favoriteGame) => { 
          return favoriteGame.id === game.id;
      });
      return <div style={listStyle} key={index}><img width={64} height={64} src={game.cover.url}/><Link><span style={textStyle}>{game.name}</span></Link>{(data) ? (<Button onClick={this.likeGame.bind(this, game.name, game.id, game.cover.url)}>Liked</Button>) : (<Button onClick={this.likeGame.bind(this, game.name, game.id, game.cover.url)}>Like</Button>)}</div>
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
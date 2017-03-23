const AsyncTypeahead = require('react-bootstrap-typeahead').AsyncTypeahead;
const React = require('react');
const axios = require('axios');
const router = require('react-router');
const Link = router.Link;
const apikeys = require('../../../apikeys');
const GameSearchForm = require('./game-search-form');
const Dropzone = require('react-dropzone');
const request = require('superagent');
const { FormGroup, FormControl, ControlLabel, Panel, Modal, Button, Col, Row } = require('react-bootstrap');


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
      return <div style={listStyle} key={index}><img width={64} height={64} src={game.cover.url}/><Link><span style={textStyle}>{game.name}</span></Link></div>
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

module.exports = GameSearch;
var AsyncTypeahead = require('react-bootstrap-typeahead').AsyncTypeahead;
const React = require('react');
const axios = require('axios');
const router = require('react-router');
const Link = router.Link;
const apikeys = require('../../../apikeys');
const GameSearchForm = require('./game-search-form');

class GameSearch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {options: []}
  }
  _handleSearch(values) {
    console.log(values)
    axios.get(`https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&limit=30&offset=0&search=${search}`,
      {headers: {'X-Mashape-Key': apikeys.IGDB_API_KEY, 'Accept': 'application/json'}}
      )
      .then(resp => resp)
      .then(json => {console.log(json.data)
        return this.setState({options: json.data})})
  }
  render() {
    return (
      <GameSearchForm onSubmit={this._handleSearch.bind(this)}/>


      <AsyncTypeahead
        labelKey="name"
        onSearch={this._handleSearch.bind(this)}
        options={this.state.options}
        placeholder="Search for user..."
        renderMenuItemChildren={(option, index) => (
          <div>
            <img
              src={option.cover.url}
              style={{
                height: '24px',
                marginRight: '10px',
                width: '24px',
              }}
            />
            <span>{option.name}</span>
          </div>
        )}
      />
    )
  }
}

module.exports = GameSearch;
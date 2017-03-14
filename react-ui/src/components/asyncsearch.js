var AsyncTypeahead = require('react-bootstrap-typeahead').AsyncTypeahead;
const React = require('react');
const axios = require('axios');
const router = require('react-router');
const Link = router.Link;

class AsyncSearch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {options: []}
  }
  _handleSearch(query) {
    if (!query) {
      return;
    }

    axios.post(`/api/search/profile`, {search:query})
      .then(resp => resp)
      .then(json => {console.log(json.data)
        return this.setState({options: json.data})});
  }

  render() {
    return (
      <AsyncTypeahead
        labelKey="username"
        onSearch={this._handleSearch.bind(this)}
        options={this.state.options}
        placeholder="Search for user..."
        renderMenuItemChildren={(option, props, index) => (
          <Link to={'/profile/'+option.username}>
          <div>
            <img
              src={option.ProfilePicture}
              style={{
                height: '24px',
                marginRight: '10px',
                width: '24px',
              }}
            />
            <span>{option.username}</span>
          </div>
          </Link>
        )}
      />
    )
  }
}

module.exports = AsyncSearch;
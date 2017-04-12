const AsyncTypeahead = require('react-bootstrap-typeahead').AsyncTypeahead;
const React = require('react');
const axios = require('axios');
const router = require('react-router');

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
      .then(json => {
        return this.setState({options: json.data})});
  }
  clickLink(username) {
      router.browserHistory.push('/profile/'+username);
  }

  render() {
    return (
      <AsyncTypeahead
        labelKey="username"
        onSearch={this._handleSearch.bind(this)}
        options={this.state.options}
        placeholder="Search for user..."
        renderMenuItemChildren={(option, props, index) => (
          <div onClick={this.clickLink.bind(this, option.username)}>
            <img
              src={option.ProfilePicture}
              role="presentation"
              style={{
                height: '24px',
                marginRight: '10px',
                width: '24px',
              }}
            />
            <span>{option.username}</span>
          </div>
        )}
      />
    )
  }
}

module.exports = AsyncSearch;
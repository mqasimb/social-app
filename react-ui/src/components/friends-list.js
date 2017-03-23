var React = require('react');
const Friend = require('./friend');
const { Form, FormControl, FormGroup, Button, Checkbox, Col, ControlLabel, Row, Panel} = require('react-bootstrap');

class FriendsList extends React.Component {
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
        var friends = this.props.list.map((friend, index) => {
                return <li key={index}>{friend.username}</li>;
            })
        return (
            <div>
            <Panel style={panelStyle}>Friends {this.props.list.length}</Panel>
            {friends}
            </div>
        )
    }
}

module.exports = FriendsList;
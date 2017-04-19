var React = require('react');
const Friend = require('./friend');
const { Panel } = require('react-bootstrap');

class FriendsList extends React.Component {
    render(props) {
        const { list } = this.props;
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
        var friends = list.map((friend, index) =>
                <Friend key={index} username={friend.username} ProfilePicture={friend.ProfilePicture}/>
        )
        return (
            <div className='friend-list'>
                <Panel style={panelStyle}>Friends - {list.length}</Panel>
                <div style={paddingStyle}>
                    {friends}
                </div>
            </div>
        )
    }
}

module.exports = FriendsList;
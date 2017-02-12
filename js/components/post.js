var React = require('react');
var { connect } = require('react-redux');
const Content = require('./content');
const { Link } = require('react-router');
const LikeBox = require('./likebox');

class Post extends React.Component {
    render(props) {
        return (
            <div>
         
            <Link to={'/post/'+this.props.id}><Content content={this.props.content}/></Link>
            <LikeBox likes={this.props.likes} onClick={this.props.likeBoxClick}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({

    })
}
var Container = connect(mapStateToProps)(Post);

module.exports = Container;

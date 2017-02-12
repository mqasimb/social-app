var React = require('react');
const router = require('react-router');
const Link = router.Link;
const { connect } = require('react-redux');
const actions = require('../actions/index');
const NewPost = require('./newpost');
const Post = require('./post');

class Home extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.getPosts());
    }
    
    userLogout(event) {
        event.preventDefault();
        this.props.dispatch(actions.logoutAction());
    }
    render() {
        var isLoggedIn = this.props.auth.authenticated;
        var arrayPosts = this.props.postData.map(function(post) {
            return <Post content={post.content} key={post._id} id={post._id} likes={post.likes}/>
        })
        return (
            <div>
            {(isLoggedIn) ? (<a href='' onClick={this.userLogout.bind(this)}>Logout</a>) : (<Link to='/login'>Login</Link>)}
            <NewPost />
            {arrayPosts}
            </div>
            )
    }
}

function mapStateToProps(state, props) {
    return ( {
        auth: state.auth,
        postData: state.postData
    })
}

var Container = connect(mapStateToProps)(Home);

module.exports = Container;
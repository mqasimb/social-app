var React = require('react');
const router = require('react-router');
const Link = router.Link;
const { connect } = require('react-redux');
const actions = require('../actions/index');
const NewPost = require('./newpost');
const Post = require('./post');

class Home extends React.Component {
    componentDidMount() {
        if(!this.props.auth.authenticated) {
            router.browserHistory.push('/login');
        }
        if(this.props.auth.authenticated) {
            this.props.dispatch(actions.getPosts());
        }
        this.props.dispatch(actions.dismountSinglePost());
    }
    
    render() {
        var arrayPosts = this.props.postData.map(function(post) {
            return <Post content={post.content} name={post.name} key={post._id} id={post._id} likes={post.likes} comments={post.comments} image={post.image}/>
        })
        return (
            <div>
            <NewPost />
            {arrayPosts}
            </div>
            )
    }
}

function mapStateToProps(state, props) {
    return ( {
        auth: state.app.auth,
        postData: state.app.postData
    })
}

var Container = connect(mapStateToProps)(Home);

module.exports = Container;
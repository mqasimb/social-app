var React = require('react');
const uuid = require('uuid');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const Post = require('./post');

class ProfilePosts extends React.Component {
    render(props) {
        if(this.props.posts) {
        var arrayPosts = this.props.posts.map(function(post, index) {
            return <Post content={post.content} profilePicture={post.profile.ProfilePicture} name={post.name} key={uuid.v1()} id={post._id} likes={post.likes} comments={post.comments} image={post.image}/>
        })
        }
        return (
            <div>
            {arrayPosts}
            </div>
        )
    }
}
module.exports = ProfilePosts;
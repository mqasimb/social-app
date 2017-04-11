const React = require('react');
const uuid = require('uuid');
const Post = require('./post');

class ProfilePosts extends React.Component {
    render(props) {
        if(this.props.posts) {
        var arrayPosts = this.props.posts.map(function(post, index) {
            return <Post content={post.content} profilePicture={post.profile.ProfilePicture} date={post.date} name={post.name} key={uuid.v1()} id={post._id} likes={post.likes} comments={post.comments} image={post.image}/>
        })
        }
        return (
            <div>
            {arrayPosts.reverse()}
            </div>
        )
    }
}
module.exports = ProfilePosts;
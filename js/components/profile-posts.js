var React = require('react');

class ProfilePosts extends React.Component {
    render(props) {
        var posts = this.props.posts.map(function(post, index) {
                return <li key={index}>{post.username} - {post.content}</li>;
            })
        return (
            <div>
            {posts}
            </div>
        )
    }
}

module.exports = ProfilePosts;
var React = require('react');
const { connect } = require('react-redux');
const actions = require('../actions/index');

class NewPost extends React.Component {
    postForm(event) {
        event.preventDefault();
        this.props.dispatch(actions.submitPostToServer(this.props.newPost));
    }
    
    changeForm(event) {
        if(event.target.name == 'content') {
        this.props.dispatch(actions.updatePostInput(event.target.name, event.target.value));
        }
    }
    
    render() {
        return(
            <div>
            <form onSubmit={this.postForm.bind(this)}>
            <label>New Post</label><input onChange={this.changeForm.bind(this)} type='text' name='content' />
            <label>Image</label><input onChange={this.changeForm.bind(this)} type='file' name='image' />
            <button>Post</button>
            </form>
            {this.props.newPost.content}
            </div>
            )
    }
}

function mapStateToProps(state, props) {
    return( {
        newPost: state.newPost
    } )
}

var Container = connect(mapStateToProps)(NewPost);

module.exports = Container;
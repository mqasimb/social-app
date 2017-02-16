var React = require('react');
const { connect } = require('react-redux');
const actions = require('../actions/index');

const Dropzone = require('react-dropzone');

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
    
    onImageDrop() {
        
    }
    
    render() {
        return(
            <div>
            <form onSubmit={this.postForm.bind(this)}>
            <label>New Post</label><input onChange={this.changeForm.bind(this)} type='text' name='content' />
            <Dropzone multiple={false} accept="image/*" onDrop={this.onImageDrop.bind(this)}> <p>Drop an image or click to select a file to upload.</p></Dropzone>
            <label>Image</label><input onChange={this.changeForm.bind(this)} type='file' name='image' />
            <button>Post</button>
            </form>
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
var React = require('react');
const { connect } = require('react-redux');
const actions = require('../actions/index');

const Dropzone = require('react-dropzone');
const request = require('superagent');
const { FormGroup, FormControl, ControlLabel, Panel, Modal, Button } = require('@sketchpixy/rubix');
const apikeys = require('../../../apikeys');

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
    
    onImageDrop(files) {
        this.props.dispatch(actions.uploadFile(files[0]));
        this.handleImageUpload(files[0]);
    }
    handleImageUpload(file) {
    let upload = request.post(apikeys.CLOUDINARY_UPLOAD_URL)
                        .field('api_key', apikeys.CLOUDINARY_API_KEY)
                        .field('api-secret', apikeys.CLOUDINARY_API_SECRET)
                        .field('upload_preset', apikeys.CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.props.dispatch(actions.setCloudinaryURL(response.body.secure_url));
      }
    });
  }
    
    render() {
        var imgStyle = {width: 100, height: 100}
        return(
            <div>
            <form onSubmit={this.postForm.bind(this)}>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>New Post</ControlLabel>
              <FormControl onChange={this.changeForm.bind(this)} name='content' value={this.props.newPost.content || ''} componentClass="textarea" placeholder="textarea" />
            </FormGroup>
            <Dropzone multiple={false} accept="image/*" onDrop={this.onImageDrop.bind(this)}> <p>Drop an image or click to select a file to upload.</p></Dropzone>
            <img src={this.props.uploadedFileCloudinaryUrl} style={imgStyle}/>
            <label>Image</label><input onChange={this.changeForm.bind(this)} type='file' name='image' />
            <button disabled={!this.props.newPost.content}>Post</button>
            </form>
            </div>
            )
    }
}

function mapStateToProps(state, props) {
    return( {
        newPost: state.app.newPost,
        uploadedFile: state.app.uploadedFile,
        uploadedFileCloudinaryUrl: state.app.uploadedFileCloudinaryUrl
    } )
}

var Container = connect(mapStateToProps)(NewPost);

module.exports = Container;
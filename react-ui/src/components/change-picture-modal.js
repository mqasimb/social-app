var React = require('react');
const ReactDOM = require('react-dom');
var { connect } = require('react-redux');
const Content = require('./content');
const { Link } = require('react-router');
const LikeBox = require('./likebox');
const actions = require('../actions/index');
const CommentList = require('./commentlist');
const router = require('react-router');
const CommentForm = require('./comment-form');
const { Panel, Modal, Button } = require('react-bootstrap');
const { reset } = require('redux-form');
const uuid = require('uuid');
const Dropzone = require('react-dropzone');
const request = require('superagent');

class ChangePictureModal extends React.Component {
    onImageDrop(files) {
        this.props.dispatch(actions.uploadProfilePic(files[0]));
        this.handleImageUpload(files[0]);
    }
    handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('api_key', CLOUDINARY_API_KEY)
                        .field('api-secret', CLOUDINARY_API_SECRET)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.props.dispatch(actions.setProfilePicCloudinaryURL(response.body.secure_url));
      }
    });
    }
    render(props) {
        var setPicture = <button onClick={this.props.setPicture}>Set New Picture</button>;
        var imgStyle = {width: 100, height: 100}
        return (
            <div>
        <Modal show={this.props.showPictureModal.toggle} onHide={this.props.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Please upload new picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please upload new picture.</p>
            <Dropzone multiple={false} accept="image/*" onDrop={this.onImageDrop.bind(this)}> <p>Drop an image or click to select a file to upload.</p></Dropzone>
            <img src={this.props.uploadedProfilePicCloudinaryUrl} style={imgStyle}/>
          </Modal.Body>
          <Modal.Footer>
            {(this.props.uploadedProfilePicCloudinaryUrl != '') ? (setPicture) : (null)}
            <Button onClick={this.props.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        showPictureModal: state.app.showPictureModal,
        uploadedProfilePicCloudinaryUrl: state.app.uploadedProfilePicCloudinaryUrl
    })
}
var Container = connect(mapStateToProps)(ChangePictureModal);

module.exports = Container;

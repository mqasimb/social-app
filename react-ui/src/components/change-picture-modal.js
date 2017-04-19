const React = require('react');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const { Modal, Button } = require('react-bootstrap');
const Dropzone = require('react-dropzone');
const request = require('superagent');
const axios = require('axios');

class ChangePictureModal extends React.Component {
    onImageDrop(files) {
        this.props.dispatch(actions.uploadProfilePic(files[0]));
        this.handleImageUpload(files[0]);
    }
    handleImageUpload(file) {
        axios.get('/api/cloudinary')
            .then(resp => resp.data)
            .then(json => {
                let upload = request.post(json.cloudinaryURL)
                    .field('api_key', json.apiKey)
                    .field('api-secret', json.apiSecret)
                    .field('upload_preset', json.uploadPreset)
                    .field('file', file);

                upload.end((err, response) => {
                    if (err) {
                      console.error(err);
                    }
                    if (response.body.secure_url !== '') {
                      this.props.dispatch(actions.setProfilePicCloudinaryURL(response.body.secure_url));
                    }
                });
            })
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
                        <img role="presentation" src={this.props.uploadedProfilePicCloudinaryUrl} style={imgStyle}/>
                    </Modal.Body>
                    <Modal.Footer>
                        {(this.props.uploadedProfilePicCloudinaryUrl !== '') ? (setPicture) : (null)}
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

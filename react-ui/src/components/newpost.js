var React = require('react');
const { connect } = require('react-redux');
const actions = require('../actions/index');

const Dropzone = require('react-dropzone');
const request = require('superagent');
const { FormGroup, FormControl, ControlLabel, Panel, Modal, Button, Col, Row } = require('react-bootstrap');
const apikeys = require('../../../apikeys');

import CheckboxPen from '../icons/checkbox-pen-outline.svg'


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
        var dropzoneStyle = {display: 'inline-block', width:150, height:150, borderStyle:'dotted', borderColor: 'black', cursor: 'pointer', color: '#06D7D4', fontFamily: 'Lato,sans-serif'}
        var newPostStyle={
            'backgroundColor': '#253243',
            'fontFamily': 'Ubuntu, sans-serif',
            paddingTop: '30px'
        }
        var textAreaStyle = {
            'backgroundColor': '#1d2838',
            'borderColor': '#1d2838',
            color: 'white',
            'fontFamily': 'Ubuntu, sans-serif'
        }
        var svgStyle = {
            height: '30px'
        }
        var buttonStyle = {
            backgroundColor: '#1683ac',
            color: '#ffffff',
            fontFamily: 'UbuntuBold',
            fontSize: '1em',
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingRight: '20px',
            paddingLeft: '20px',
            borderRadius: '0',
            borderColor: '#1683ac'
        }
        var buttonCenter = {
            textAlign: 'center'
        }
        return(
            <div style={newPostStyle}>
            <Row><Col componentClass={ControlLabel} xsOffset={1} smOffset={1} mdOffset={2} xs={6} sm={6}>
            <img style={svgStyle} src={CheckboxPen} /><span className="create-post-span">Create Post</span>
            </Col></Row>
            <form onSubmit={this.postForm.bind(this)}>
            <Row><Col xs={10} xsOffset={1} md={10} mdOffset={1} md={8} mdOffset={2} lg={8}><FormGroup controlId="formControlsTextarea">
              <ControlLabel>New Post</ControlLabel>
              <FormControl style={textAreaStyle} onChange={this.changeForm.bind(this)} name='content' value={this.props.newPost.content || ''} componentClass="textarea" placeholder="Write a status update..." />
            </FormGroup></Col></Row>
            <Row><Col style={buttonCenter} xs={4} xsOffset={7} smOffset={7} mdOffset={7} md={4} lg={4}>
            <Button style={buttonStyle} onClick={this.postForm.bind(this)} bsStyle="info" disabled={!this.props.newPost.content}>Post</Button>
            </Col></Row>
            <Row><Col xs={12} md={8} lg={8}><Dropzone style={dropzoneStyle} multiple={false} accept="image/*" onDrop={this.onImageDrop.bind(this)}> <p>Drop files here to upload (or click)</p></Dropzone>
            <img src={this.props.uploadedFileCloudinaryUrl} style={imgStyle}/></Col></Row>
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
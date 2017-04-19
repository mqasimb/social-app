const React = require('react');
const { connect } = require('react-redux');
const { Modal, Button } = require('react-bootstrap');

class DeleteModal extends React.Component {
    render(props) {
        var confirmDelete = <Button onClick={this.props.delete.bind(this)}>Delete Post</Button>;
        return (
            <div>
                <Modal show={this.props.showModal.toggle} onHide={this.props.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Post Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Would you like to delete this post?.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        {confirmDelete}
                        <Button onClick={this.props.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        showModal: state.app.showModal
    })
}
var Container = connect(mapStateToProps)(DeleteModal);

module.exports = Container;

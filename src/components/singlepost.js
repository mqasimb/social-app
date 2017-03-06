var React = require('react');
var { connect } = require('react-redux');
const Content = require('./content');
const actions = require('../actions/index');
const LikeBox = require('./likebox');
const router = require('react-router');
const { Button } = require('@sketchpixy/rubix');

class SinglePost extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.getSinglePost(this.props.params.id));
    }
    likeBoxClick(event) {
        event.preventDefault();
        this.props.dispatch(actions.updateLikeStatus(this.props.params.id)).then((response) => {
            this.props.dispatch(actions.getSinglePost(this.props.params.id))
            this.props.dispatch(actions.getSinglePost(this.props.params.id))
        });
    }
    deleteClick(event) {
        event.preventDefault();
        this.props.dispatch(actions.deletePost(this.props.params.id));
    }
    editInput(event) {
        event.preventDefault();
        this.props.dispatch(actions.editInput(event.target.name, event.target.value));
    }
    submitEdit(event) {
        event.preventDefault();
        this.props.dispatch(actions.submitEdittedPost(this.props.params.id, this.props.editInput)).then((response)  =>{
            this.props.dispatch(actions.getSinglePost(this.props.params.id));
            this.props.dispatch(actions.editPostDisable());
        })
    }
    cancelEdit(event) {
        event.preventDefault();
        this.props.dispatch(actions.editPostDisable());
    }
    enableEdit(event) {
        event.preventDefault();
        this.props.dispatch(actions.editPostEnable());
    }
    returnHome(event) {
        event.preventDefault();
        router.browserHistory.push('/');
    }
    render(props) {
        var content = <Content content={this.props.singlePost.content}/>;
        var username = this.props.singlePost.name;
        var likeBox = <LikeBox likes={this.props.singlePost.likes} onClick={this.likeBoxClick.bind(this)}/>;
        if(this.props.isEdit) {
            content = <input type='text' name='content' value={(this.props.editInput.content) ? (this.props.editInput.content) : (this.props.singlePost.content)} onChange={this.editInput.bind(this)} />
        }
        return (
            <div>
            <button onClick={this.returnHome.bind(this)}>Return Home</button>
            {(!this.props.postLoading) ? (content) : (null)}
            {(!this.props.postLoading) ? (username) : (null)}
            {(!this.props.postLoading) ? (likeBox) : (null)}
            {(!this.props.postLoading && this.props.isEdit) ? (<Button onClick={this.submitEdit.bind(this)}>Submit Edit</Button>) : (null)}
            {(!this.props.postLoading && this.props.isEdit) ? (<Button onClick={this.cancelEdit.bind(this)}>Cancel Edit</Button>) : (null)}
            {(!this.props.postLoading && !this.props.isEdit) ? (<Button onClick={this.enableEdit.bind(this)}>Edit Post</Button>) : (null)}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        singlePost: state.app.singlePost,
        postLoading : state.app.postLoading,
        isEdit: state.app.isEdit,
        editInput: state.app.editInput
    })
}
var Container = connect(mapStateToProps)(SinglePost);

module.exports = Container;

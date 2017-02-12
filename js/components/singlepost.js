var React = require('react');
var { connect } = require('react-redux');
const Content = require('./content');
const actions = require('../actions/index');

class SinglePost extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.getSinglePost(this.props.params.id));
    }
    render(props) {
        return (
            <div>
            <Content content={this.props.singlePost.content}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({
        singlePost: state.singlePost
    })
}
var Container = connect(mapStateToProps)(SinglePost);

module.exports = Container;

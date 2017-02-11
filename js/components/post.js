var React = require('react');
var {
    connect
} = require('react-redux');

class Post extends React.Component {
    render(props) {
        return (
            <div>
            <Image />
            <Content />
            <LikeBox />
            <Comments />
            <CommentBox />
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ({

    })
}
var Container = connect(mapStateToProps)(Post);

module.exports = Container;

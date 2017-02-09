var React = require('react');
const router = require('react-router');
const Link = router.Link;

class Home extends React.Component {
    render() {
        return (
            <div>
            <Link to='/login'>Login</Link>
            </div>
            )
    }
}

module.exports = Home;
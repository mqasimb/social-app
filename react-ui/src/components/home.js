const React = require('react');
const { connect } = require('react-redux');
const actions = require('../actions/index');
const NewPost = require('./newpost');
const Post = require('./post');
const uuid = require('uuid');
const { FormGroup, Button, Col, Jumbotron } = require('react-bootstrap');

import ChatSVG from "../icons/chat.svg";
import GameControllerSVG from "../icons/game-controller.svg";
import MilkyWaySVG from "../icons/milky-way.svg";
import GroupSVG from "../icons/group.svg";

class Home extends React.Component {
    componentDidMount() {
        if(this.props.auth.authenticated) {
            this.props.dispatch(actions.getPosts());
        }
        this.props.dispatch(actions.dismountSinglePost());
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.auth.authenticated !== nextProps.auth.authenticated) {
            this.props.dispatch(actions.getPosts());
        }
    }
    submitLoginDemoAccount() {
        this.props.dispatch(actions.loginAction({username:'DemoAccount', password:'123456789'}))
    }
    render() {
        var arrayPosts = this.props.postData.map((post, index) =>
            <Post content={post.content} profilePicture={post.profile.ProfilePicture} date={post.date} name={post.name} key={uuid.v1()} id={post._id} likes={post.likes} comments={post.comments} image={post.image}/>
        )
        var boxStyle={
            paddingTop: '15px',
            paddingBottom: '15px',
            marginTop: '10px',
            marginBottom: '10px',
            backgroundColor: '#ffffff',
            color: '#337AB7',
            maxWidth: '1000px',
            margin: '20px auto',
            padding: '20px',
        }
        var svgStyle = {
            height: '100px',
            marginTop: '20px',
            marginBottom: '20px'
        }
        var textStyle = {
            color: '#337AB7',
            fontSize: '1.25em',
            fontFamily: 'Ubuntu'
        }
        var mainTextStyle = {
            color: '#337AB7',
            fontSize: '3em',
            fontFamily: 'Ubuntu'
        }
        var jumbotronStyle = {
            backgroundColor: '#ffffff',
            color: '#337AB7',
            margin: '0 auto',
            padding: '20px',
            textAlign: 'center'
        }
        var demoButtonStyle = {
            backgroundColor: '#0E86CA',
            color: '#ffffff',
            fontFamily: 'Ubuntu',
            fontSize: '1.25em',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingRight: '10px',
            paddingLeft: '10px',
            borderRadius: '0',
            borderColor: '#10A1DE',
            marginTop: '10px',
            whiteSpace: 'normal'
        }
        var demoButtonTextStyle = {
            textAlign: 'center',
            color: '#ffffff',
        }
        var listStyle = {
            textAlign: 'center'
        }
        var formStyle = {
            paddingBottom: '60px'
        }
        return (
            <div>
                {(this.props.auth.authenticated) ? (<div>
                    <NewPost />
                    <div className='posts'>
                        {arrayPosts.reverse()}
                    </div>
                </div>) : (
                <div style={boxStyle}>
                    <Jumbotron style={jumbotronStyle}>
                        <span style={mainTextStyle}>{'Social Gamers'}</span><br/>
                        <span style={textStyle}>Connect With Gamers Across The Galaxy</span><br/>
                        <img role="presentation" src={MilkyWaySVG} style={svgStyle}/>
                    </Jumbotron>
                    <div style={listStyle}>
                        <span style={textStyle}>Share Updates With Other Users</span><br/><img role="presentation" src={GameControllerSVG} style={svgStyle}/><br/>
                        <span style={textStyle}>Chat With Fellow Gamers!</span><br/><img role="presentation" src={ChatSVG} style={svgStyle}/><br/>
                        <span style={textStyle}>Sign Up Today And Make Some Awesome Friends!</span><br/><img role="presentation" src={GroupSVG} style={svgStyle}/><br/>
                    </div>
                    <FormGroup style= {formStyle}>
                        <Col style={demoButtonTextStyle} xs={6} xsOffset={3} sm={6} smOffset={3}>
                            <Button onClick={this.submitLoginDemoAccount.bind(this)} style={demoButtonStyle}>Demo Account / Login</Button>
                        </Col>
                    </FormGroup>
                </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return ( {
        auth: state.app.auth,
        postData: state.app.postData
    })
}

var Container = connect(mapStateToProps)(Home);

module.exports = Container;
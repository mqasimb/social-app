const React = require('react');
const router = require('react-router');
const Link = router.Link;
const { connect } = require('react-redux');
const actions = require('../actions/index');
const NewPost = require('./newpost');
const Post = require('./post');
const uuid = require('uuid');
const { FormGroup, FormControl, ControlLabel, Panel, Modal, Button, Col, Row, Media, Jumbotron } = require('react-bootstrap');

import ChatSVG from "../icons/chat.svg";
import GameControllerSVG from "../icons/game-controller.svg";
import MilkyWaySVG from "../icons/milky-way.svg";
import SpaceSVG from "../icons/solar-system.svg";
import SwordSVG from "../icons/sword.svg";
import GroupSVG from "../icons/group.svg";

class Home extends React.Component {
    componentDidMount() {
        if(this.props.auth.authenticated) {
            this.props.dispatch(actions.getPosts());
        }
        this.props.dispatch(actions.dismountSinglePost());
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps, this.props)
        if(this.props.auth.authenticated !== nextProps.auth.authenticated) {
            this.props.dispatch(actions.getPosts());
        }
    }
    submitLoginDemoAccount() {
          this.props.dispatch(actions.loginAction({username:'DemoAccount', password:'123456789'}))
    }
    render() {
        var arrayPosts = this.props.postData.map(function(post, index) {
            return <Post content={post.content} profilePicture={post.profile.ProfilePicture} date={post.date} name={post.name} key={uuid.v1()} id={post._id} likes={post.likes} comments={post.comments} image={post.image}/>
        })
        var newIssueStyle={
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
        var issueLabelsStyle = {
            paddingTop: '15px',
            paddingBottom: '15px',
            marginTop: '10px',
            marginBottom: '10px',
            backgroundColor: '#0D355D',
            color: '#337AB7',
            maxWidth: '1000px',
            margin: '20px auto',
            padding: '20px',
            fontFamily: 'Ubuntu',
            fontSize: '1.25em'
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
            margin: '20px auto',
            padding: '20px',
            textAlign: 'center'
        }
        var demoButtonStyle = {
            backgroundColor: '#0E86CA',
            color: '#ffffff',
            fontFamily: 'Ubuntu',
            fontSize: '1em',
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
            color: '#ffffff'
        }
        var listStyle = {
            textAlign: 'center',
            marginTop: '50px'
        }
        return (
            <div>
            {(this.props.auth.authenticated) ? (<div>
                <NewPost />
                <div className='posts'>
                {arrayPosts.reverse()}
                </div>
            </div>) : (
            <div style={newIssueStyle}>
            <Jumbotron style={jumbotronStyle}>
            <span style={mainTextStyle}>{'Social Gamers'}</span><br/>
            <span style={textStyle}>Connect With Gamers Across The Galaxy</span><br/>
            <img src={MilkyWaySVG} style={svgStyle}/>
            <FormGroup>
              <Col style={demoButtonTextStyle} xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Button onClick={this.submitLoginDemoAccount.bind(this)} style={demoButtonStyle}>Demo Account / Login</Button>
              </Col>
            </FormGroup>
            </Jumbotron>
            <div style={listStyle}>
            <span style={textStyle}>Share Updates With Other Users</span><br/><img src={GameControllerSVG} style={svgStyle}/><br/>
            <span style={textStyle}>Chat With Fellow Gamers!</span><br/><img src={ChatSVG} style={svgStyle}/><br/>
            <span style={textStyle}>Sign Up Today And Make Some Awesome Friends!</span><br/><img src={GroupSVG} style={svgStyle}/><br/>
            </div>
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
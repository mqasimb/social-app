var mongoose = require('mongoose');

var messagesSchema = new mongoose.Schema({
	friend: String,
	messages: []
 })

var UserProfileSchema = new mongoose.Schema({
    username: String,
    Name: String,
    AboutMe: String,
    ProfilePicture: { type: String, default: 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png' },
    Friends:[{type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true}],
    incomingRequests: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true}],
    outgoingRequests: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    onlineStatus: {type: Boolean, default: false, required: true},
    messages:[messagesSchema]
});

var UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = UserProfile;
var mongoose = require('mongoose');

var FriendSchema = new mongoose.Schema({
    username: String,
    Name: String,
    profile: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true}
});

var IncomingRequestsSchema = new mongoose.Schema({
    username: String,
    Name: String,
    profile: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true}
});

var OutgoingRequestsSchema = new mongoose.Schema({
    username: String,
    Name: String,
    profile: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true}
});

var UserProfileSchema = new mongoose.Schema({
    username: String,
    Name: String,
    AboutMe: String,
    ProfilePicture: { type: String, default: 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png' },
    Friends:[FriendSchema],
    incomingRequests: [IncomingRequestsSchema],
    outgoingRequests: [OutgoingRequestsSchema],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
});

var UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = UserProfile;
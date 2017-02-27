var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
    username: String,
    Name: String,
    AboutMe: String,
    Friends:[{}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true}
});

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
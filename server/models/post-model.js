var mongoose = require('mongoose');

var LikesSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    like: Boolean
})

var CommentSchema = new mongoose.Schema({
    comment: String,
    username: String,
    date: Date,
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
    profile: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'}
})

var PostSchema = new mongoose.Schema({
    name: String,
    content: {
        type: String,
        required: true
    },
    comments: [CommentSchema],
    likes: [LikesSchema],
    image: String,
    profile: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'},
    date: Date
})

var Post = mongoose.model('Post', PostSchema);


module.exports = Post;
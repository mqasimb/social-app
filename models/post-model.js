var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    type: String,
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: Date
})

var LikesSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
})

var PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    comments: [CommentSchema],
    likes: [LikesSchema],
    image: String
})

var Post = new mongoose.model('Post', PostSchema);

module.exports = Post;
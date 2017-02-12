var mongoose = require('mongoose');

var LikesSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
})

var CommentSchema = new mongoose.Schema({
    type: String,
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: Date,
    likes: [LikesSchema]
})

var PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    comments: [CommentSchema],
    likes: [LikesSchema],
    image: String,
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
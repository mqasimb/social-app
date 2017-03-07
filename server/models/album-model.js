var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var AlbumSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
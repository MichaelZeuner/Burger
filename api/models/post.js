const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: String,
    content: String
});

module.exports = mongoose.model('Post', postSchema);
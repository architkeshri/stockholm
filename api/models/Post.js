const mongoose= require('mongoose');

// User Table
const postSchema= new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    imageurl: {
        type: String,
    },
    desc: {
        type: String,
    }
}, {timestamps: true});

const Post = mongoose.model("posts", postSchema);
module.exports = Post;
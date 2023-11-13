const mongoose = require('mongoose');

// schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        require: true,
    },
    postType: {
        type: String,
        require: true,
    }
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
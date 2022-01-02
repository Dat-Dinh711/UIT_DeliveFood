const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    slug: { type: String },
    userName: { type: String },
    avatar: { type: String },
    comment: { type: String, },
    date: { type: String, },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comment', Comment);
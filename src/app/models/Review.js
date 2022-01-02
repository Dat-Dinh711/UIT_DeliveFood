const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    productID: { type: String, },
    rating: { type: Number, },
    review: { type: String, },
    userName: { type: String },
    avatar: { type: String },
    // image: { type: String },
    date: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Review', Review);
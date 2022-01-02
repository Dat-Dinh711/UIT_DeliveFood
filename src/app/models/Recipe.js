const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Recipe = new Schema({
    name: { type: String, maxLength: 50, },
    desc: { type: String, },
    thumbnail: { type: String, },
    slug: { type: String, slug: 'name', unique: true, },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Recipe', Recipe);
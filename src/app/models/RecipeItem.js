const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const RecipeItem = new Schema({
    recipe: { type: String },
    name: { type: String },
    desc: { type: String, },
    thumbnail: { type: String, },
    material: { type: Array, },
    making: { type: Array, },
    slug: { type: String, slug: 'name', unique: true, },
}, {
    timestamps: true,
});

module.exports = mongoose.model('RecipeItem', RecipeItem);
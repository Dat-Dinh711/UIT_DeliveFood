const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const ProductList = new Schema({
    productName: { type: String, maxLength: 500, },
    productID: { type: String, maxLength: 100, },
    price: { type: Number, },
    discount: { type: Number, },
    quantity: { type: Number, },
    category: { type: String, maxLength: 50, },
    desc: { type: String, },
    image: { type: String, },
    review: { type: Number, },
    rating: { type: Number, },
    onSale: { type: Boolean, },
    shopName: { type: String, maxLength: 50, },
    isFeatured: { type: Boolean, },
    isBestSeller: { type: Boolean, },
    slug: { type: String, slug: 'productName', unique: true, },
}, {
    timestamps: true,
});

// Add plugins
mongoose.plugin(slug);
ProductList.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('ProductList', ProductList);
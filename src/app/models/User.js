const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const User = new Schema({
    userName: { type: String, },
    name: { type: String, },
    avatar: { type: String, },
    phone: { type: String, },
    gender: { type: String, },
    date: { type: String, },
    role: { type: String, },
    password: { type: String, maxLength: 150, },
    address: { type: String, maxLength: 200, },
    cart: { type: Object },
    shopName: { type: String, maxLength: 50, },
    shopAddress: { type: String, maxLength: 200, },
    shopAvatar: { type: String, },
    shopDate: { type: String, },
    totalProduct: { type: Number, },
    totalProductSell: { type: Number, },
    totalRevenueSeller: { type: Number, },
    shipperName: { type: String, maxLength: 100, },
    shipperAddress: { type: String, maxLength: 200, },
    shipperTypeMotor: { type: String, maxLength: 20, },
    shipperLicensePlates: { type: String, },
    shipperDate: { type: String, },
    totalOrderReceived: { type: Number, },
    totalOrderDelivered: { type: Number, },
    totalRevenue: { type: Number, },
    totalOrderCancel: { type: Number, },
    slug: { type: String, slug: 'shopName', unique: true, },
}, {
    timestamps: true,
});

// Add plugins
mongoose.plugin(slug);

module.exports = mongoose.model('User', User);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    orderID: { type: String, },
    cart: { type: Object },
    totalPrice: { type: Number },
    shippingFee: { type: Number },
    quantity: { type: Number },
    name: { type: String, },
    address: { type: String, },
    phone: { type: String, },
    shopName: { type: String, },
    shopAddress: { type: String, },
    shipperName: { type: String },
    shipperAddress: { type: String },
    shipperPhone: { type: String },
    shipperLicensePlates: { type: String },
    shipperTypeMotor: { type: String },
    status: { type: String },
    purchaseDate: { type: String },
    paymentMethod: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', Order);
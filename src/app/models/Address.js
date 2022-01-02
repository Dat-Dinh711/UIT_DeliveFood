const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    phone: { type: String },
    address: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Address', Address);
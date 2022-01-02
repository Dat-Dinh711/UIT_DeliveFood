const mongoose = require('mongoose');
// const acl = require('acl');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/UIT_DeliveFood_dev');

        console.log('Connect Successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
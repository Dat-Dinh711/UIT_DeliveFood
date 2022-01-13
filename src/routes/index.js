const recipeRouter = require('./recipe');
const siteRouter = require('./site');
const sellerRouter = require('./seller');
const shipperRouter = require('./shipper');
const productRouter = require('./product');
const userRouter = require('./user');

const sellerVerify = require('../app/middlewares/SellerVerifyMiddleware');
const shipperVerify = require('../app/middlewares/ShipperVerifyMiddleware');

function route(app) {
    app.use('/shipper', shipperVerify, shipperRouter);
    app.use('/seller', sellerVerify, sellerRouter);
    app.use('/user', userRouter);
    app.use('/recipe', recipeRouter);
    app.use('/product-list', productRouter);
    app.use('/', siteRouter);
}

module.exports = route;
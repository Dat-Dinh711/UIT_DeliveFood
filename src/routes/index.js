const recipeRouter = require('./recipe');
const siteRouter = require('./site');
const sellerRouter = require('./seller');
const shipperRouter = require('./shipper');
const productRouter = require('./product');
const userRouter = require('./user');

function route(app) {
    app.use('/shipper', shipperRouter);
    app.use('/seller', sellerRouter);
    app.use('/user', userRouter);
    app.use('/recipe', recipeRouter);
    app.use('/product-list', productRouter);
    app.use('/', siteRouter);
}

module.exports = route;
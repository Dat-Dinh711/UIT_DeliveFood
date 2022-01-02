const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const validateRegisterMiddleware = require('../app/middlewares/ValidateRegisterMiddleware');
const validateLoginMiddleware = require('../app/middlewares/ValidateLoginMiddleware');
const validateForgotPasswordMiddleware = require('../app/middlewares/ValidateForgotPasswordMiddleware');
const restrict = require('../app/middlewares/AuthMiddleware');
const selectAddress = require('../app/middlewares/SelectAddressMiddleware');
const validateSellerRegisterUserName = require('../app/middlewares/ValidateSellerRegisterMiddleware');

router.get('/error', siteController.error);
router.get('/shop/:slug', siteController.shop);
router.post('/buy-now/:id', restrict, siteController.buyNow);
router.post('/pay-cash', selectAddress, siteController.payCash);
router.post('/order', siteController.order);
router.get('/pay-success', siteController.paySuccess);
router.post('/pay', siteController.pay);
router.get('/checkout', siteController.checkout);
router.post('/checkout', siteController.checkoutCart);
router.post('/add-to-cart/:id', restrict, siteController.addToCart);
router.get('/search', siteController.search);
router.post('/shipper-register', siteController.shipperRegister);
router.post('/seller-register',
    validateSellerRegisterUserName,
    siteController.sellerRegister);
router.post('/forgot-password',
    validateForgotPasswordMiddleware.phoneNotExist,
    siteController.forgotPassword);
router.get('/logout', siteController.logout);
router.post('/login',
    validateLoginMiddleware.validateLoginUserName,
    siteController.login);
router.post('/cart/clear', siteController.clearCart);
router.post('/cart/update/:id', siteController.updateCart);
router.get('/cart',
    restrict,
    siteController.cart);
router.get('/about', siteController.about);
router.post('/store',
    validateRegisterMiddleware.userNameExist,
    validateRegisterMiddleware.phoneExist,
    siteController.store);
router.get('/', siteController.home);

module.exports = router;
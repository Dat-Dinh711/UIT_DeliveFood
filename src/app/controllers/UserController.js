const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');
const Order = require('../models/Order');
const Review = require('../models/Review');
const Product = require('../models/ProductList');
const User = require('../models/User');
const Address = require('../models/Address');
var today = new Date();

const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserController {
    // [GET] /user/purchase
    purchase(req, res, next) {
        if (req.query.status === 'all' || !req.query.status) {
            Order.find({ userID: req.session.authUser._id }).sort({ createdAt: -1 })
                .then(orders => {
                    res.render('orderAll', {
                        layout: 'mainPurchase',
                        title: 'Đơn mua',
                        orders: multipleMongooseToObject(orders),
                        messageUser: req.flash('messageUser'),
                        allActive: 'order-all__navbar-item-active',
                    })
                })
        } else {
            Order.find({ userID: req.session.authUser._id, status: req.query.status }).sort({ createdAt: -1 })
                .then(orders => {
                    if (req.query.status) {
                        var filedActive = req.query.status + 'Active';
                    } else {
                        var filedActive = 'allActive';
                    }
                    res.render('orderAll', {
                        layout: 'mainPurchase',
                        title: 'Đơn mua',
                        orders: multipleMongooseToObject(orders),
                        messageUser: req.flash('messageUser'),
                        [filedActive]: 'order-all__navbar-item-active',
                    })
                })
        }
    }

    // [POST] /user/review
    review(req, res, next) {
        const formData = req.body;
        formData.productID = req.params.slug;
        formData.userName = req.session.authUser.userName;
        if (req.session.authUser.avatar) {
            formData.avatar = req.session.authUser.avatar;
        }
        formData.image = req.session.authUser.image;
        formData.date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        const review = new Review(formData);
        review.save()
            .then()
            .catch(next);

        Product.findOne({ slug: req.params.slug })
            .then(product => {
                if (!product.review) {
                    product.review = 0;
                } else {
                    product.review = product.review;
                }

                product.review++;

                var rating = 0;
                var count = 0;
                Review.find({ productID: req.params.slug })
                    .then(reviews => {
                        for (var i in reviews) {
                            rating += reviews[i].rating;
                            count++;
                        }
                        product.rating = Math.round(rating / count);
                        Product.updateOne({ slug: req.params.slug }, {
                                review: product.review,
                                rating: product.rating,
                            })
                            .then(() => {
                                req.flash('message', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']);
                                res.redirect(req.headers.referer);
                            });
                    })
            })
    }

    // [POST] /user/purchase/update/:id
    update(req, res, next) {
        Order.updateOne({ _id: req.params.id }, { status: req.body.status })
            .then(() => {
                res.redirect('/user/purchase?status=cancel');
            })
    }

    // [GET] /user/count
    account(req, res, next) {
        User.findOne({ _id: req.session.authUser._id })
            .then(user => {
                res.render('accountAll', {
                    layout: 'mainAccount',
                    title: 'Tài khoản',
                    user: mongooseToObject(user),
                    messageAccount: req.flash('messageAccount'),
                    isProfileClicked: 'account__navbar-selection-item-active',
                    // allActive: 'order-all__navbar-item-active',
                })
            })
    }

    // [POST] /user/account/profile/update
    updateProfile(req, res, next) {
        const formData = req.body;
        if (req.file) {
            formData.avatar = req.file.path.split('\\').slice(1).join('/');
        } else {
            formData.avatar = req.session.authUser.avatar;
        }
        User.updateOne({ _id: req.session.authUser._id }, formData)
            .then()
            .catch(next);
        Review.updateMany({ userName: req.session.authUser.userName }, { avatar: formData.avatar })
            .then(() => {
                req.session.authUser.avatar = formData.avatar;
                req.flash('messageAccount', ['1']);
                res.redirect('back');
            })
    }

    // [GET] /user/account/address
    accountAddress(req, res, next) {
        Address.find({ userID: req.session.authUser._id })
            .then(addresses => {
                res.render('accountAddress', {
                    layout: 'mainAccount',
                    title: 'Tài khoản - Địa chỉ',
                    css: 'accountAddress.css',
                    addresses: multipleMongooseToObject(addresses),
                    messageAccount: req.flash('messageAccount'),
                    isAddressClicked: 'account__navbar-selection-item-active',
                })
            })
    }

    // [POST] /user/account/address/add
    add(req, res, next) {
        var formData = req.body;
        formData.userID = req.session.authUser._id;
        const address = new Address(formData);
        address.save()
            .then(() => {
                req.flash('messageAccount', ['1', '2']);
                res.redirect('back');
            })
    }

    // [GET] /user/account/address/update/:id
    updateAddress(req, res, next) {
        Address.findOne({ _id: req.params.id })
            .then(address => {
                res.render('accountEditAddress', {
                    layout: 'mainAccount',
                    title: 'Tài khoản - Địa chỉ',
                    css: 'accountEditAddress.css',
                    address: mongooseToObject(address),
                    messageAccount: req.flash('messageAccount'),
                    isAddressClicked: 'account__navbar-selection-item-active',
                })
            })
    }

    // [POST] /user/account/address/update/:id
    updateAddressExec(req, res, next) {
        switch (req.query.type) {
            case 'edit':
                Address.updateOne({ _id: req.params.id }, req.body)
                    .then(() => {
                        req.flash('messageAccount', ['1']);
                        res.redirect('/user/account/address');
                    })
                break;

            case 'delete':
                Address.deleteOne({ _id: req.params.id })
                    .then(() => {
                        req.flash('messageAccount', ['1', '2', '3']);
                        res.redirect('/user/account/address');
                    })
                break;
        }
    }

    // [POST] /user/change-address
    changeAddress(req, res, next) {
        Address.findOne({ _id: req.body.addressID })
            .then(address => {
                req.session.address = address;
                res.redirect('/checkout');
            })
    }

    // [GET] /user/account/password
    accountPassword(req, res, next) {
        res.render('accountPassword', {
            layout: 'mainAccount',
            title: 'Tài khoản - Mật khẩu',
            css: 'accountPassword.css',
            // addresses: multipleMongooseToObject(addresses),
            messageAccount: req.flash('messageAccount'),
            isPasswordClicked: 'account__navbar-selection-item-active',
        })
    }

    // [POST] /user/account/password/change
    changePassword(req, res, next) {
        req.flash('messageAccount', ['1', '2', '3', '4']);

        const formData = req.body;
        let encryptedPassword = '';

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(formData.password, salt, function(err, hash) {
                encryptedPassword = hash;

                formData.password = encryptedPassword;
                User.updateOne({ _id: req.session.authUser._id }, formData)
                    .then(res.redirect('/user/account/profile'))
                    .catch(next);
            });
        });
    }
}

module.exports = new UserController;
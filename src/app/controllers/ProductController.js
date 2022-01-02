const Product = require('../models/ProductList');
const Review = require('../models/Review');
const User = require('../models/User');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');

const PAGE_SIZE = 32;
const REVIEW_PAGE_SIZE = 6;

class ProductController {

    // [GET] /product
    index(req, res, next) {
        var page = req.query.page || 1;
        if (page) {
            // get page
            page = parseInt(page);
            if (page < 1) {
                page = 1;
            }
            var numberSkip = (page - 1) * PAGE_SIZE;

            Product.find({})
                .skip(numberSkip)
                .limit(PAGE_SIZE)
                .then(products => {
                    Product.countDocuments({})
                        .then((total) => {
                            var totalPage = Math.ceil(total / PAGE_SIZE)
                            res.render('productList', {
                                title: 'Danh sách sản phẩm',
                                css: 'productlist.css',
                                products: multipleMongooseToObject(products),
                                message: req.flash('message'),
                                page, //current
                                totalPage //pages
                            })
                        })
                })
                .catch(next);
        }
    }

    // [GET] /product-list/:slug
    show(req, res, next) {
        var page = req.query.page || 1;
        if (page) {
            // get page
            page = parseInt(page);
            if (page < 1) {
                page = 1;
            }
            var numberSkip = (page - 1) * REVIEW_PAGE_SIZE;

            if (req.query.rating === 'all' || !req.query.rating) {
                Promise.all([Product.findOne({ slug: req.params.slug }),
                        Review.find({ productID: req.params.slug }).sort({ createdAt: -1 })
                        .skip(numberSkip)
                        .limit(REVIEW_PAGE_SIZE)
                    ])
                    .then(([product, reviews]) => {
                        Promise.all([Review.find({ productID: req.params.slug }).countDocuments(),
                                User.findOne({ shopName: product.shopName })
                            ])
                            .then(([total, user]) => {
                                var totalPage = Math.ceil(total / REVIEW_PAGE_SIZE);
                                res.render('productDetail', {
                                    title: 'Sản phẩm',
                                    css: 'productDetail.css',
                                    js: '/js/productDetail.js',
                                    product: mongooseToObject(product),
                                    reviews: multipleMongooseToObject(reviews),
                                    user: mongooseToObject(user),
                                    allClicked: 'container__product-reviews-rating__filter--active',
                                    message: req.flash('message'),
                                    page, //current
                                    totalPage, //pages
                                    rating: 'all',
                                })
                            })
                    })
            } else if (req.query.rating === '5') {
                Promise.all([Product.findOne({ slug: req.params.slug }),
                        Review.find({ productID: req.params.slug, rating: '5' })
                        .skip(numberSkip)
                        .limit(REVIEW_PAGE_SIZE)
                    ])
                    .then(([product, reviews]) => {
                        Promise.all([Review.find({ productID: req.params.slug, rating: '5' }).countDocuments(),
                                User.findOne({ shopName: product.shopName })
                            ])
                            .then(([total, user]) => {
                                var totalPage = Math.ceil(total / REVIEW_PAGE_SIZE);
                                res.render('productDetail', {
                                    title: 'Sản phẩm',
                                    css: 'productDetail.css',
                                    js: '/js/productDetail.js',
                                    product: mongooseToObject(product),
                                    reviews: multipleMongooseToObject(reviews),
                                    user: mongooseToObject(user),
                                    fiveClicked: 'container__product-reviews-rating__filter--active',
                                    message: req.flash('message'),
                                    page, //current
                                    totalPage, //pages
                                    rating: '5',
                                })
                            })
                    })
            } else if (req.query.rating === '4') {
                Promise.all([Product.findOne({ slug: req.params.slug }),
                        Review.find({ productID: req.params.slug, rating: '4' })
                        .skip(numberSkip)
                        .limit(REVIEW_PAGE_SIZE)
                    ])
                    .then(([product, reviews]) => {
                        Promise.all([Review.find({ productID: req.params.slug, rating: '4' }).countDocuments(),
                                User.findOne({ shopName: product.shopName })
                            ])
                            .then(([total, user]) => {
                                var totalPage = Math.ceil(total / REVIEW_PAGE_SIZE);
                                res.render('productDetail', {
                                    title: 'Sản phẩm',
                                    css: 'productDetail.css',
                                    js: '/js/productDetail.js',
                                    product: mongooseToObject(product),
                                    reviews: multipleMongooseToObject(reviews),
                                    user: mongooseToObject(user),
                                    fourClicked: 'container__product-reviews-rating__filter--active',
                                    message: req.flash('message'),
                                    page, //current
                                    totalPage, //pages
                                    rating: '4',
                                })
                            })
                    })
            } else if (req.query.rating === '3') {
                Promise.all([Product.findOne({ slug: req.params.slug }),
                        Review.find({ productID: req.params.slug, rating: '3' })
                        .skip(numberSkip)
                        .limit(REVIEW_PAGE_SIZE)
                    ])
                    .then(([product, reviews]) => {
                        Promise.all([Review.find({ productID: req.params.slug, rating: '3' }).countDocuments(),
                                User.findOne({ shopName: product.shopName })
                            ])
                            .then(([total, user]) => {
                                var totalPage = Math.ceil(total / REVIEW_PAGE_SIZE);
                                res.render('productDetail', {
                                    title: 'Sản phẩm',
                                    css: 'productDetail.css',
                                    js: '/js/productDetail.js',
                                    product: mongooseToObject(product),
                                    reviews: multipleMongooseToObject(reviews),
                                    user: mongooseToObject(user),
                                    threeClicked: 'container__product-reviews-rating__filter--active',
                                    message: req.flash('message'),
                                    page, //current
                                    totalPage, //pages
                                    rating: '3',
                                })
                            })
                    })
            } else if (req.query.rating === '2') {
                Promise.all([Product.findOne({ slug: req.params.slug }),
                        Review.find({ productID: req.params.slug, rating: '2' })
                        .skip(numberSkip)
                        .limit(REVIEW_PAGE_SIZE)
                    ])
                    .then(([product, reviews]) => {
                        Promise.all([Review.find({ productID: req.params.slug, rating: '2' }).countDocuments(),
                                User.findOne({ shopName: product.shopName })
                            ])
                            .then(([total, user]) => {
                                var totalPage = Math.ceil(total / REVIEW_PAGE_SIZE);
                                res.render('productDetail', {
                                    title: 'Sản phẩm',
                                    css: 'productDetail.css',
                                    js: '/js/productDetail.js',
                                    product: mongooseToObject(product),
                                    reviews: multipleMongooseToObject(reviews),
                                    user: mongooseToObject(user),
                                    twoClicked: 'container__product-reviews-rating__filter--active',
                                    message: req.flash('message'),
                                    page, //current
                                    totalPage, //pages
                                    rating: '2',
                                })
                            })
                    })
            } else if (req.query.rating === '1') {
                Promise.all([Product.findOne({ slug: req.params.slug }),
                        Review.find({ productID: req.params.slug, rating: '1' })
                        .skip(numberSkip)
                        .limit(REVIEW_PAGE_SIZE)
                    ])
                    .then(([product, reviews]) => {
                        Promise.all([Review.find({ productID: req.params.slug, rating: '1' }).countDocuments(),
                                User.findOne({ shopName: product.shopName })
                            ])
                            .then(([total, user]) => {
                                var totalPage = Math.ceil(total / REVIEW_PAGE_SIZE);
                                res.render('productDetail', {
                                    title: 'Sản phẩm',
                                    css: 'productDetail.css',
                                    js: '/js/productDetail.js',
                                    product: mongooseToObject(product),
                                    reviews: multipleMongooseToObject(reviews),
                                    user: mongooseToObject(user),
                                    oneClicked: 'container__product-reviews-rating__filter--active',
                                    message: req.flash('message'),
                                    page, //current
                                    totalPage, //pages
                                    rating: '1',
                                })
                            })
                    })
            }
        }
    }

    // [GET] /product-list/:category
    item(req, res, next) {
        var key = req.query.q;

        var page = req.query.page || 1;
        if (page) {
            // get page
            page = parseInt(page);
            if (page < 1) {
                page = 1;
            }
            var numberSkip = (page - 1) * PAGE_SIZE;

            Product.find({ category: key })
                .skip(numberSkip)
                .limit(PAGE_SIZE)
                .then(products => {
                    Product.find({ category: key }).countDocuments({})
                        .then((total) => {
                            var totalPage = Math.ceil(total / PAGE_SIZE)
                            res.render('productList', {
                                title: 'Danh sách sản phẩm',
                                css: 'productlist.css',
                                products: multipleMongooseToObject(products),
                                message: req.flash('message'),
                                titleProduct: 'q',
                                category: key,
                                key,
                                page, //current
                                totalPage //pages 
                            })
                        })
                })
                .catch(next);
        }
    }
}

module.exports = new ProductController;
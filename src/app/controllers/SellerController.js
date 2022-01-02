const ProductList = require('../models/ProductList');
const Order = require('../models/Order');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');
const User = require('../models/User');

class SellerController {

    // [GET] /seller/overview
    index(req, res, next) {
        User.findOne({ _id: req.session.authUser._id })
            .then(user => {
                res.render('seller/overviewShop', {
                    layout: 'mainSeller',
                    css: 'overViewShop.css',
                    header: 'Tổng quan trong tháng',
                    user: mongooseToObject(user),
                    messageSeller: req.flash('messageSeller'),
                    isClickedOverview: 'navbar__seller-category-item-active',
                });
            })
    }

    // [GET] /seller/product-list
    show(req, res, next) {
        let productQuery = ProductList.find({ shopName: req.session.authUser.shopName });

        if (req.query.hasOwnProperty('_sort')) {
            productQuery = productQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([productQuery, ProductList.findDeleted({ shopName: req.session.authUser.shopName }).countDocuments(),
                ProductList.find({ shopName: req.session.authUser.shopName }).countDocuments()
            ])
            .then(([productlists, deletedProductCount, countProductsList]) =>
                res.render('seller/productList', {
                    layout: 'mainSeller',
                    css: 'productlist.css',
                    js: 'productList.js',
                    header: 'Danh sách sản phẩm',
                    productlists: multipleMongooseToObject(productlists),
                    messageSeller: req.flash('messageSeller'),
                    deletedProductCount,
                    countProductsList,
                    isClickedProductList: 'navbar__seller-category-item-active',
                })
            )
            .catch(next);
    }

    // [GET] /seller/add-product
    add(req, res, next) {
        ProductList.find({})
            .then(productlists => {
                res.render('seller/addProduct', {
                    layout: 'mainSeller',
                    css: 'addProduct.css',
                    header: 'Thêm sản phẩm',
                    productlists: multipleMongooseToObject(productlists),
                })
            })
            .catch(next);
    }

    // [POST] /seller/store
    store(req, res, next) {
        const formData = req.body;
        if (formData.discount) {
            formData.onSale = true;
        } else {
            formData.onSale = false;
        }
        formData.image = req.file.path.split('\\').slice(1).join('/');
        formData.shopName = req.session.authUser.shopName;
        const product = new ProductList(formData);
        product.save()
            .then()
            .catch(next);

        User.updateOne({ _id: req.session.authUser._id }, { totalProduct: req.session.authUser.totalProduct + parseInt(formData.quantity) })
            .then(() => {
                req.session.authUser.totalProduct = req.session.authUser.totalProduct + parseInt(formData.quantity);
                req.flash('messageSeller', ['1', '2', '3']);
                res.redirect('/seller/product-list');
            })
            .catch(next);
    }

    // [GET] /seller/product-list/search
    search(req, res, next) {
        let productQuery = ProductList.find({ shopName: req.session.authUser.shopName, $text: { $search: req.query.keyword } });

        if (req.query.hasOwnProperty('_sort')) {
            productQuery = productQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([productQuery, ProductList.findDeleted({ shopName: req.session.authUser.shopName }).countDocuments(),
                ProductList.find({ shopName: req.session.authUser.shopName, $text: { $search: req.query.keyword } }).countDocuments()
            ])
            .then(([productlists, deletedProductCount, countProductsList]) =>
                res.render('seller/productList', {
                    layout: 'mainSeller',
                    css: 'productlist.css',
                    js: 'productList.js',
                    header: 'Danh sách sản phẩm',
                    productlists: multipleMongooseToObject(productlists),
                    messageSeller: req.flash('messageSeller'),
                    deletedProductCount,
                    countProductsList,
                    isClickedProductList: 'navbar__seller-category-item-active',
                    key: req.query.keyword,
                    title: 'search',
                })
            )
            .catch(next);
    }

    // [GET] /seller/product-list/:id/edit
    edit(req, res, next) {
        ProductList.findById(req.params.id)
            .then(productlist => {
                res.render('seller/editProduct', {
                    layout: 'mainSeller',
                    css: 'addProduct.css',
                    header: 'Sửa sản phẩm',
                    productlist: mongooseToObject(productlist),
                })
            })
            .catch(next);
    }

    // [PUT] /seller/product-list/:id
    update(req, res, next) {
        const formData = req.body;
        if (formData.discount) {
            formData.onSale = true;
        } else {
            formData.onSale = false;
        }

        ProductList.findOne({ _id: req.params.id })
            .then(product => {
                if (req.file) {
                    formData.image = req.file.path.split('\\').slice(1).join('/');
                } else {
                    formData.image = product.image;
                }

                if (formData.quantity != product.quantity) {
                    User.updateOne({ _id: req.session.authUser._id }, { totalProduct: req.session.authUser.totalProduct + (parseInt(formData.quantity) - product.quantity) })
                        .then(() => {
                            ProductList.updateOne({ _id: req.params.id }, formData)
                                .then(() => {
                                    req.session.authUser.totalProduct = req.session.authUser.totalProduct + (parseInt(formData.quantity) - product.quantity);
                                    req.flash('messageSeller', ['1', '2']);
                                    res.redirect('/seller/product-list');
                                })
                                .catch(next);
                        })
                } else {
                    ProductList.updateOne({ _id: req.params.id }, formData)
                        .then(() => {
                            req.flash('messageSeller', ['1', '2']);
                            res.redirect('/seller/product-list');
                        })
                        .catch(next);
                }
            })
    }

    // [DELETE] /seller/product-list/:id
    delete(req, res, next) {
        ProductList.findOne({ _id: req.params.id })
            .then(product => {
                User.updateOne({ _id: req.session.authUser._id }, { totalProduct: req.session.authUser.totalProduct - product.quantity })
                    .then(() => {
                        ProductList.delete({ _id: req.params.id })
                            .then(() => {
                                req.session.authUser.totalProduct = req.session.authUser.totalProduct - product.quantity;
                                req.flash('messageSeller', ['1', '2', '3', '4']);
                                res.redirect('/seller/product-list');
                            })
                            .catch(next);
                    })
            })
    }

    // [GET] /seller/deleted-product-list
    deletedCourses(req, res, next) {
        let productDeletedQuery = ProductList.findDeleted({ shopName: req.session.authUser.shopName });

        if (req.query.hasOwnProperty('_sort')) {
            productDeletedQuery = productDeletedQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([productDeletedQuery, ProductList.find({ shopName: req.session.authUser.shopName }).countDocuments()])
            .then(([productlists, countProductsList]) => {
                res.render('seller/deletedProductList', {
                    layout: 'mainSeller',
                    css: 'productlist.css',
                    js: 'deletedProductList.js',
                    header: 'Danh sách sản phẩm đã xóa',
                    productlists: multipleMongooseToObject(productlists),
                    countProductsList,
                    isClickedProductList: 'navbar__seller-category-item-active',
                })
            })
            .catch(next);
    }

    // [PATCH] /seller/product-list/:id/restore
    restore(req, res, next) {
        ProductList.findOneDeleted({ _id: req.params.id })
            .then(product => {
                User.updateOne({ _id: req.session.authUser._id }, { totalProduct: req.session.authUser.totalProduct + product.quantity })
                    .then(() => {
                        ProductList.restore({ _id: req.params.id })
                            .then(() => {
                                req.session.authUser.totalProduct = req.session.authUser.totalProduct + product.quantity;
                                req.flash('messageSeller', ['1', '2', '3', '4', '5']);
                                res.redirect('/seller/product-list');
                            })
                            .catch(next);
                    })
            })
    }

    // [DELETE] /seller/product-list/:id/destroy
    destroy(req, res, next) {
        ProductList.deleteOne({ _id: req.params.id })
            .then(res.redirect('back'))
            .catch(next);
    }

    // [POST] /seller/product-list/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                ProductList.find({ _id: { $in: req.body.productIDs } })
                    .then(products => {
                        var quantity = 0;
                        for (var i in products) {
                            quantity += products[i].quantity
                        }
                        User.updateOne({ _id: req.session.authUser._id }, { totalProduct: req.session.authUser.totalProduct - quantity })
                            .then(() => {
                                ProductList.delete({ _id: { $in: req.body.productIDs } })
                                    .then(() => {
                                        req.session.authUser.totalProduct = req.session.authUser.totalProduct - quantity;
                                        req.flash('messageSeller', ['1', '2', '3', '4']);
                                        res.redirect('/seller/product-list');
                                    })
                                    .catch(next);
                            })
                    })
                break;
            case 'restore':
                ProductList.findDeleted({ _id: { $in: req.body.productIDs } })
                    .then(products => {
                        var quantity = 0;
                        for (var i in products) {
                            quantity += products[i].quantity;
                        }
                        User.updateOne({ _id: req.session.authUser._id }, { totalProduct: req.session.authUser.totalProduct + quantity })
                            .then(() => {
                                ProductList.restore({ _id: { $in: req.body.productIDs } })
                                    .then(() => {
                                        req.session.authUser.totalProduct = req.session.authUser.totalProduct + quantity;
                                        req.flash('messageSeller', ['1', '2', '3', '4', '5']);
                                        res.redirect('/seller/product-list');
                                    })
                                    .catch(next);
                            })
                    })
                break;
            case 'forceDelete':
                ProductList.deleteMany({ _id: { $in: req.body.productIDs } })
                    .then(res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' })
        }
    }

    // [GET] /seller/delivery-manager
    deliveryManager(req, res, next) {
        Order.find({ shopName: req.session.authUser.shopName }).sort({ createdAt: -1 })
            .then(orders => {
                res.render('seller/deliveryManager', {
                    layout: 'mainSeller',
                    css: 'deliveryManager.css',
                    header: 'Quản lý đơn hàng',
                    orders: multipleMongooseToObject(orders),
                    // messageSeller: req.flash('messageSeller'),
                    isClickedDeliveryManager: 'navbar__seller-category-item-active',
                });
            })
    }

    // [GET] /seller/delivery-manager/:id
    orderDetail(req, res, next) {
        var id = req.params.id;
        Order.findOne({ _id: id })
            .then(order => {
                switch (order.paymentMethod) {
                    case 'Cash':
                        var method = 'Thanh toán tiền mặt khi nhận hàng.'
                        break;
                    case 'Cart':
                        var method = 'Thanh toán qua thẻ ngân hàng.'
                        break;
                    case 'Paypal':
                        var method = 'Thanh toán qua Paypal.'
                        break;
                }
                res.render('seller/orderDetail', {
                    layout: 'mainSeller',
                    css: 'orderDetail.css',
                    header: 'Chi tiết đơn hàng',
                    order: mongooseToObject(order),
                    method,
                    isClickedDeliveryManager: 'navbar__seller-category-item-active',
                });
            })

        // console.log(req.session.authUser);
    }

    // [POST] /seller/delivery-manager/update/:id
    updateDelivery(req, res, next) {
        if (req.body.status === 'success') {
            User.updateOne({ _id: req.session.authUser._id }, {
                    totalProductSell: req.session.authUser.totalProductSell + parseInt(req.body.quantity),
                    totalRevenueSeller: req.session.authUser.totalRevenueSeller + parseInt(req.body.price),
                })
                .then(() => {
                    req.session.authUser.totalProductSell = req.session.authUser.totalProductSell + parseInt(req.body.quantity);
                    req.session.authUser.totalRevenueSeller = req.session.authUser.totalRevenueSeller + parseInt(req.body.price);
                })
        }

        Order.findOneAndUpdate({ _id: req.params.id }, {
                status: req.body.status,
                shopAddress: req.session.authUser.shopAddress
            })
            .then(() => {
                res.redirect('/seller/delivery-manager');
            })
    }

    // [GET] /seller/account
    account(req, res, next) {
        User.findOne({ _id: req.session.authUser._id })
            .then(user => {
                res.render('seller/InfoShop', {
                    layout: 'mainSeller',
                    css: 'InfoShop.css',
                    header: 'Thông tin cửa hàng',
                    user: mongooseToObject(user),
                    messageSeller: req.flash('messageSeller'),
                });
            })
    }

    // [GET] /seller/account/edit
    editAccount(req, res, next) {
        User.findOne({ _id: req.session.authUser._id })
            .then(user => {
                res.render('seller/editInfoShop', {
                    layout: 'mainSeller',
                    css: 'editInfoShop.css',
                    header: 'Chỉnh sửa thông tin cửa hàng',
                    user: mongooseToObject(user),
                });
            })
    }

    // [POST] /seller/account/edit-shop
    editShop(req, res, next) {
        var formData = req.body;

        if (req.file) {
            formData.shopAvatar = req.file.path.split('\\').slice(1).join('/');
        } else {
            formData.shopAvatar = req.session.authUser.shopAvatar;
        }

        User.updateOne({ _id: req.session.authUser._id }, formData)
            .then()
            .catch(next);

        ProductList.updateMany({ shopName: req.session.authUser.shopName }, {
                shopName: formData.shopName,
            })
            .then()
            .catch(next);

        Order.updateMany({ shopName: req.session.authUser.shopName }, {
                shopName: formData.shopName,
                shopAddress: formData.shopAddress,
            })
            .then(() => {
                req.session.authUser.shopName = formData.shopName;
                req.session.authUser.shopAddress = formData.shopAddress;
                req.session.authUser.shopAvatar = formData.shopAvatar;
                req.flash('messageSeller', ['1', '2', '3', '4', '5', '6']);
                res.redirect('/seller/account');
            })
            .catch(next);
    }
}

module.exports = new SellerController;
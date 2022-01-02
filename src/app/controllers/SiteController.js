const Recipe = require('../models/Recipe');
const User = require('../models/User');
const Product = require('../models/ProductList');
const paypal = require('paypal-rest-sdk');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Address = require('../models/Address');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const PAGE_SIZE = 32;

const PAGE_STORE_SIZE = 30;

var today = new Date();

class SiteController {

    // [GET] /
    home(req, res, next) {
        Promise.all([
                Recipe.find({}),
                Product.find({ isFeatured: true }).limit(10),
                Product.findOne({ category: 'Rau Củ', onSale: true }, ),
                Product.find({ category: 'Rau Củ', onSale: false }).limit(4),
                Product.find({ category: 'Thịt Hải Sản Tươi Sống' }).limit(8),
                Product.find({ category: 'Thịt Hải Sản Tươi Sống', isBestSeller: true }).limit(6),
                Product.findOne({ category: 'Trái Cây Tươi', onSale: true }),
                Product.find({ category: 'Trái Cây Tươi', onSale: false }).limit(4),
            ])
            .then(([recipes, productsFeatured, vegetableProductsThumbnail, productsVegetable, productsMeat, productsBestSeller,
                fruitProductThumbnail, productsFruit
            ]) => {
                res.render('home', {
                    title: 'UIT - DeliveFood',
                    css: 'homepage.css',
                    js: 'js/homepage.js',
                    recipes: multipleMongooseToObject(recipes),
                    productsFeatured: multipleMongooseToObject(productsFeatured),
                    vegetableProductsThumbnail: mongooseToObject(vegetableProductsThumbnail),
                    productsVegetable: multipleMongooseToObject(productsVegetable),
                    productsMeat: multipleMongooseToObject(productsMeat),
                    productsBestSeller: multipleMongooseToObject(productsBestSeller),
                    fruitProductThumbnail: mongooseToObject(fruitProductThumbnail),
                    productsFruit: multipleMongooseToObject(productsFruit),
                    message: req.flash('message'),
                })
            })
            .catch(next);
    }

    // [POST] /store
    store(req, res, next) {
        req.flash('message', ['1', '2', '3']);

        const formData = req.body;
        let encryptedPassword = '';

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(formData.password, salt, function(err, hash) {
                encryptedPassword = hash;

                // formData.address = 'null';
                formData.role = 'buyer';
                formData.password = encryptedPassword;
                const user = new User(formData);
                user.save()
                    .then(res.redirect('/'))
                    .catch(next);
            });
        });
    }

    // [POST] /login
    login(req, res, next) {
        req.flash('message', ['1', '2', '3', '4', '5', '6']);
        // console.log(req.session.authUser);

        res.redirect(req.headers.referer);
    }

    // [GET] /logout
    logout(req, res, next) {
        req.session.isAuthenticated = false;
        req.session.authUser = null;
        req.session.address = null;
        req.flash('message', ['1', '2', '3', '4', '5', '6', '7', '8']);
        res.redirect(req.headers.referer);
    }

    // [POST] /forgot-password
    forgotPassword(req, res, next) {
        req.flash('message', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

        const formData = req.body;
        let encryptedPassword = '';

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(formData.password, salt, function(err, hash) {
                encryptedPassword = hash;

                formData.password = encryptedPassword;
                User.updateOne({ phone: req.body.phone }, formData)
                    .then(res.redirect(req.headers.referer))
                    .catch(next);
            });
        });
    }

    // [POST] /sellerRegister
    sellerRegister(req, res, next) {
        req.flash('messageSeller', ['1']);

        User.updateOne({ _id: req.session.authUser._id }, {
                shopDate: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
                totalProduct: 0,
                totalProductSell: 0,
                totalRevenueSeller: 0,
            })
            .then(() => {})

        User.updateOne({ _id: req.session.authUser._id }, req.body)
            .then(() => {
                req.session.authUser.role = req.body.role;
                req.session.authUser.shopName = req.body.shopName;
                req.session.authUser.shopAddress = req.body.shopAddress;

                res.redirect('/seller/overview');
            })
            .catch(next);
    }

    // [POST] /shipperRegister
    shipperRegister(req, res, next) {
        req.flash('messageShipper', ['1']);

        User.updateOne({ _id: req.session.authUser._id }, {
                shipperDate: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
                totalOrderReceived: 0,
                totalOrderDelivered: 0,
                totalRevenue: 0,
                totalOrderCancel: 0,
            })
            .then(() => {})

        User.updateOne({ _id: req.session.authUser._id }, req.body)
            .then(() => {
                req.session.authUser.role = req.body.role;
                req.session.authUser.shipperName = req.body.shipperName;
                req.session.authUser.shipperAddress = req.body.shipperAddress;
                req.session.authUser.shipperTypeMotor = req.body.shipperTypeMotor;
                req.session.authUser.shipperLicensePlates = req.body.shipperLicensePlates;
                req.session.authUser.shipperDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
                req.session.authUser.totalOrderReceived = 0;
                req.session.authUser.totalOrderDelivered = 0;
                req.session.authUser.totalRevenue = 0;

                res.redirect('/shipper/overview');
            })
            .catch(next);
    }

    // [GET] /about
    about(req, res) {
        res.render('about', {
            title: 'Về Chúng tôi',
            css: 'about.css',
            message: req.flash('message'),
        });
    }

    // [POST] /search
    search(req, res, next) {
        var key = req.query.keyword;

        var page = req.query.page || 1;
        if (page) {
            // get page
            page = parseInt(page);
            if (page < 1) {
                page = 1;
            }
            var numberSkip = (page - 1) * PAGE_SIZE;

            Product.find({ $text: { $search: key } })
                .skip(numberSkip)
                .limit(PAGE_SIZE)
                .then(products => {
                    Product.find({ $text: { $search: key } }).countDocuments({})
                        .then((total) => {
                            var totalPage = Math.ceil(total / PAGE_SIZE)
                            res.render('productList', {
                                title: 'Danh sách sản phẩm',
                                css: 'productlist.css',
                                products: multipleMongooseToObject(products),
                                message: req.flash('message'),
                                titleProduct: 'keyword',
                                search: 'search',
                                key,
                                total,
                                page, //current
                                totalPage //pages
                            })
                        })
                })
                .catch(next);
        }
    }

    // [POST] /add-to-cart/:id
    addToCart(req, res, next) {
        var qty = 0;
        if (req.body.qty) {
            qty = parseInt(req.body.qty);
        } else {
            qty = 1;
        }
        var productId = req.params.id;
        var cart = new Cart(req.session.authUser.cart ? req.session.authUser.cart : {});
        Product.findById({ _id: productId })
            .then(product => {
                cart.add(product, productId, qty);
                req.session.authUser.cart = cart;

                User.updateOne({ _id: req.session.authUser._id }, { cart: req.session.authUser.cart })
                    .then(() => {
                        res.redirect(req.headers.referer);
                    })
            })
            .catch(next);

        req.flash('message', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
    }

    // [GET] /cart
    cart(req, res, next) {
        if (!req.session.authUser.cart) {
            return res.render('cart', {
                title: 'Giỏ Hàng',
                css: 'cart.css',
                products: null,
            })
        }
        var cart = new Cart(req.session.authUser.cart);
        res.render('cart', {
            title: 'Giỏ Hàng',
            css: 'cart.css',
            js: 'js/cart.js',
            products: cart.generateArray(),
            totalPrice: cart.totalPrice,
        })
    }

    // [POST] /cart/update/:id
    updateCart(req, res, next) {
        var id = req.params.id;
        var cart = req.session.authUser.cart;
        var product = cart.items;
        var action = req.query.action;

        cart.totalPrice = 0;
        cart.totalItems = 0;
        cart.totalQty = 0;

        for (var i in product) {
            if (product[i].item._id == id) {
                switch (action) {
                    case 'add':
                        product[i].qty++;

                        break;
                    case 'sub':
                        product[i].qty--;
                        if (product[i].qty < 1) {
                            delete product[i];
                        }
                        break;
                    case 'clear':
                        delete product[i];
                        break;
                }
            }
        }

        for (var i in product) {
            product[i].price = (product[i].item.price * (1 - (product[i].item.discount / 100))) * product[i].qty;
            cart.totalPrice += product[i].price;
            cart.totalItems++;
            cart.totalQty += product[i].qty;
        }

        User.updateOne({ _id: req.session.authUser._id }, { cart: cart })
            .then(() => {
                res.redirect('back');
            })
    }

    // [POST] /cart/clear
    clearCart(req, res, next) {
        var cart = req.session.authUser.cart;
        var product = cart.items;

        for (var i in product) {
            delete product[i];
            cart.totalPrice = 0;
            cart.totalItems = 0;
            cart.totalQty = 0;
        }

        User.updateOne({ _id: req.session.authUser._id }, { cart: cart })
            .then(() => {
                res.redirect('back');
            })
    }

    // [GET] /checkout
    checkout(req, res, next) {
        if (!req.session.authUser) {
            res.redirect('/');
        }

        if (!req.session.order) {
            return res.redirect('/cart');
        }

        var totalPriceProduct = 0;
        for (var i of req.session.order) {
            totalPriceProduct += (parseFloat(i.item.price) * (1 - (i.item.discount / 100))) * i.qty;
        }

        var shippingFee = Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000;

        req.session.shippingFee = shippingFee;

        var errMsg = req.flash('error')[0];

        Promise.all([Address.findOne({ userID: req.session.authUser._id }),
                Address.find({ userID: req.session.authUser._id })
            ])
            .then(([address, addresses]) => {
                res.render('checkout', {
                    title: 'Thanh Toán',
                    css: 'checkout.css',
                    js: 'js/checkout.js',
                    addresses: multipleMongooseToObject(addresses),
                    shippingFee: shippingFee,
                    totalPriceProduct: totalPriceProduct,
                    totalPrice: totalPriceProduct + shippingFee,
                    errMsg: errMsg,
                    mpErrors: !errMsg,
                    message: req.flash('message'),
                });
            })
    }

    // [POST] /checkout
    checkoutCart(req, res, next) {
        if (!req.session.order) {
            return res.redirect('/cart');
        }
        // var cart = new Cart(req.session.authUser.cart);

        var items = [];
        for (var i of req.session.order) {
            items.push({
                name: i.item.productName,
                shopName: i.item.shopName,
                price: (i.item.price * (1 - (i.item.discount / 100))),
                quantity: i.qty,
            })
        }

        var total = 0;
        var shopName = [];

        for (var i = 0; i < items.length; i++) {
            total += parseFloat(items[i].price) * items[i].quantity;
            shopName.push(items[i].shopName);
        }

        const stripe = require('stripe')('sk_test_51K6GORG4Ozz25YtBethujXLaXsPJ7xPMslUEMqksN6Mtrs2YNNsZiIeTIKsnO5jqSqod8dVWUbK6nBqpMDBRSJDO00TubB1Ga6');
        stripe.charges.create({
            amount: total,
            currency: 'vnd',
            source: req.body.stripeToken,
            description: 'Test Charge',
        }, function(err, charge) {
            if (err) {
                req.flash('error', err.message);
                return res.redirect('/checkout');
            }

            var purchase = req.session.order;
            var shopName = [];
            for (var i in purchase) {
                if (shopName.indexOf(purchase[i].item.shopName) === -1) {
                    shopName.push(purchase[i].item.shopName);
                }
            }

            var orders = []
            for (var i in shopName) {
                orders.push(orderArr(req, shopName[i]));
            }

            var shippingFee = (req.session.shippingFee / (orders.length)).toFixed(0);

            for (var i in orders) {
                var totalPrice = 0;
                var quantity = 0;
                for (var j in orders[i]) {
                    totalPrice += orders[i][j].price;
                    quantity += orders[i][j].qty;
                    var shopName = orders[i][j].item.shopName;
                }
                var order = new Order({
                    userID: req.session.authUser,
                    orderID: 'DH' + Math.floor(Math.random() * (9999 - 1000 + 1)),
                    cart: orders[i],
                    totalPrice: totalPrice,
                    shippingFee: shippingFee,
                    quantity: quantity,
                    shopName: shopName,
                    name: req.body.name,
                    address: req.body.address,
                    phone: req.body.phone,
                    status: 'confirm',
                    paymentMethod: 'Cart',
                    purchaseDate: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
                });

                order.save()
                    .then(() => {})
            }

            req.flash('messageUser', ['1']);
            res.redirect('/user/purchase');

            var cart = req.session.authUser.cart || [];
            var product = cart.items || [];

            for (var i in product) {
                for (var j of req.session.order) {
                    if (i == j.item._id) {
                        delete product[i];
                    }
                }
            }

            cart.totalPrice = 0;
            cart.totalItems = 0;
            cart.totalQty = 0;

            for (var i in product) {
                cart.totalPrice += product[i].price;
                cart.totalItems++;
                cart.totalQty += product[i].qty;
            }

            User.updateOne({ _id: req.session.authUser._id }, { cart: cart })
                .then(() => {
                    req.session.order = null;
                })
        });
    }

    // [POST] /pay
    pay(req, res, next) {
        var items = [];
        for (var i of req.session.order) {
            items.push({
                name: i.item.productName,
                price: ((i.item.price * (1 - (i.item.discount / 100))) / 22982).toFixed(2),
                currency: "USD",
                quantity: i.qty,
            })
        }

        var total = 0;
        for (var i = 0; i < items.length; i++) {
            total += parseFloat(items[i].price) * items[i].quantity;
        }

        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/pay-success",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": items,
                },
                "amount": {
                    "currency": "USD",
                    "total": total.toFixed(2).toString()
                },
                "description": "This is the payment description."
            }]
        };

        paypal.payment.create(create_payment_json, function(error, payment) {
            if (error) {
                throw error;
            } else {
                for (var i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });

        var cart = req.session.authUser.cart || [];
        var product = cart.items || [];

        for (var i in product) {
            for (var j of req.session.order) {
                if (i == j.item._id) {
                    delete product[i];
                }
            }
        }

        cart.totalPrice = 0;
        cart.totalItems = 0;
        cart.totalQty = 0;

        for (var i in product) {
            cart.totalPrice += product[i].price;
            cart.totalItems++;
            cart.totalQty += product[i].qty;
        }

        User.updateOne({ _id: req.session.authUser._id }, { cart: cart })
            .then(() => {

            })
    }

    // [GET] /pay-success
    paySuccess(req, res, next) {
        var payerID = req.query.PayerID;
        var items = [];
        for (var i of req.session.order) {
            items.push({
                name: i.item.productName,
                price: ((i.item.price * (1 - (i.item.discount / 100))) / 22982).toFixed(2),
                currency: "USD",
                quantity: i.qty,
            })
        }

        var total = 0;
        for (var i = 0; i < items.length; i++) {
            total += parseFloat(items[i].price) * items[i].quantity;
        }

        var execute_payment_json = {
            "payer_id": payerID,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": total.toFixed(2).toString()
                }
            }]
        };

        var paymentId = req.query.paymentId;

        paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                var purchase = req.session.order;
                var shopName = [];
                for (var i in purchase) {
                    if (shopName.indexOf(purchase[i].item.shopName) === -1) {
                        shopName.push(purchase[i].item.shopName);
                    }
                }

                var orders = []
                for (var i in shopName) {
                    orders.push(orderArr(req, shopName[i]));
                }

                var shippingFee = (req.session.shippingFee / (orders.length)).toFixed(0);

                for (var i in orders) {
                    var totalPrice = 0;
                    var quantity = 0;
                    for (var j in orders[i]) {
                        totalPrice += orders[i][j].price;
                        quantity += orders[i][j].qty;
                        var shopName = orders[i][j].item.shopName;
                    }
                    var order = new Order({
                        userID: req.session.authUser,
                        orderID: 'DH' + Math.floor(Math.random() * (9999 - 1000 + 1)),
                        cart: orders[i],
                        totalPrice: totalPrice,
                        shippingFee: shippingFee,
                        quantity: quantity,
                        shopName: shopName,
                        name: 'Bùi Thị Phương Trinh',
                        address: 'Gia Lâm, Hà Nội',
                        phone: '0376621304',
                        status: 'confirm',
                        paymentMethod: 'Paypal',
                        purchaseDate: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
                    });

                    order.save()
                        .then(() => {})
                }

                req.flash('messageUser', ['1']);
                res.redirect('/user/purchase');
            }
        });
    }

    // [POST] /order
    order(req, res, next) {
        req.session.order = null;

        var cart = req.session.authUser.cart;
        var product = cart.items;

        var id = req.body.cartIDs;
        var order = [];

        for (var i in product) {
            for (var j of id) {
                if (i == j) {
                    id.splice(j, 1);
                    order.push(product[i]);
                }
            }
        }

        req.session.order = order;

        res.redirect('/checkout');
    }

    // [POST] /pay-cash
    payCash(req, res, next) {
        var cart = req.session.authUser.cart || [];
        var product = cart.items || [];

        for (var i in product) {
            for (var j of req.session.order) {
                if (i == j.item._id) {
                    delete product[i];
                }
            }
        }

        cart.totalPrice = 0;
        cart.totalItems = 0;
        cart.totalQty = 0;

        for (var i in product) {
            cart.totalPrice += product[i].price;
            cart.totalItems++;
            cart.totalQty += product[i].qty;
        }

        User.updateOne({ _id: req.session.authUser._id }, { cart: cart })
            .then(() => {})

        var purchase = req.session.order;
        var shopName = [];
        for (var i in purchase) {
            if (shopName.indexOf(purchase[i].item.shopName) === -1) {
                shopName.push(purchase[i].item.shopName);
            }
        }

        var orders = []
        for (var i in shopName) {
            orders.push(orderArr(req, shopName[i]));
        }

        var shippingFee = (req.session.shippingFee / (orders.length)).toFixed(0);

        for (var i in orders) {
            var totalPrice = 0;
            var quantity = 0;
            for (var j in orders[i]) {
                totalPrice += orders[i][j].price;
                quantity += orders[i][j].qty;
                var shopName = orders[i][j].item.shopName;
            }
            var order = new Order({
                userID: req.session.authUser,
                orderID: 'DH' + Math.floor(Math.random() * (9999 - 1000 + 1)),
                cart: orders[i],
                totalPrice: totalPrice,
                shippingFee: shippingFee,
                quantity: quantity,
                shopName: shopName,
                name: req.session.address.name,
                address: req.session.address.address,
                phone: req.session.address.phone,
                status: 'confirm',
                paymentMethod: 'Cash',
                purchaseDate: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
            });

            order.save()
                .then(() => {})
        }

        req.flash('messageUser', ['1']);
        res.redirect('/user/purchase');
        req.session.cart = null;
    }

    // [POST] /buy-now/:id
    buyNow(req, res, next) {
        req.session.order = null;

        var order = [];
        var items = new Object();

        var id = req.params.id
        var qty = req.body.qty;

        Product.findOne({ _id: id })
            .then(product => {
                items.item = product;
                items.qty = parseInt(qty);
                items.price = (product.price * (1 - (product.discount / 100))) * parseInt(qty);

                order.push(items);
                req.session.order = order;
                res.redirect('/checkout');
            })
    }

    // [GET] /shop/:slug
    shop(req, res, next) {
        var page = req.query.page || 1;
        if (page) {
            // get page
            page = parseInt(page);
            if (page < 1) {
                page = 1;
            }
            var numberSkip = (page - 1) * PAGE_STORE_SIZE;

            if (!req.query.type) {
                User.findOne({ slug: req.params.slug })
                    .then(user => {
                        Product.find({ shopName: user.shopName })
                            .then(productArr => {
                                var category = [];
                                for (var i in productArr) {
                                    if (category.indexOf(productArr[i].category) === -1) {
                                        category.push(productArr[i].category)
                                    }
                                }

                                Promise.all([
                                        Product.find({ shopName: user.shopName })
                                        .skip(numberSkip)
                                        .limit(PAGE_STORE_SIZE),
                                        Product.find({ shopName: user.shopName }).countDocuments()
                                    ])
                                    .then(([products, total]) => {
                                        var totalPage = Math.ceil(total / PAGE_STORE_SIZE);

                                        var title = user.shopName + ', Cửa hàng trực tuyến | UIT - DeliveFood'

                                        res.render('store', {
                                            title,
                                            css: 'store.css',
                                            user: mongooseToObject(user),
                                            products: multipleMongooseToObject(products),
                                            category: category,
                                            message: req.flash('message'),
                                            page, //current
                                            totalPage, //pages
                                            isClicked: 'Tất cả',
                                        });
                                    })
                            })
                    })
            } else if (req.query.type === 'onsale') {
                User.findOne({ slug: req.params.slug })
                    .then(user => {
                        Product.find({ shopName: user.shopName })
                            .then(productArr => {
                                var category = [];
                                for (var i in productArr) {
                                    if (category.indexOf(productArr[i].category) === -1) {
                                        category.push(productArr[i].category)
                                    }
                                }

                                Promise.all([
                                        Product.find({ shopName: user.shopName, onSale: true })
                                        .skip(numberSkip)
                                        .limit(PAGE_STORE_SIZE),
                                        Product.find({ shopName: user.shopName, onSale: true }).countDocuments()
                                    ])
                                    .then(([products, total]) => {
                                        var totalPage = Math.ceil(total / PAGE_STORE_SIZE);

                                        var title = user.shopName + ', Cửa hàng trực tuyến | UIT - DeliveFood'

                                        res.render('store', {
                                            title,
                                            css: 'store.css',
                                            user: mongooseToObject(user),
                                            products: multipleMongooseToObject(products),
                                            category: category,
                                            message: req.flash('message'),
                                            page, //current
                                            totalPage, //pages
                                            titleProduct: 'type',
                                            key: 'onsale',
                                            isClicked: 'Sản phẩm khuyến mãi',
                                        });
                                    })
                            })
                    })
            } else {
                User.findOne({ slug: req.params.slug })
                    .then(user => {
                        Product.find({ shopName: user.shopName })
                            .then(productArr => {
                                var category = [];
                                for (var i in productArr) {
                                    if (category.indexOf(productArr[i].category) === -1) {
                                        category.push(productArr[i].category)
                                    }
                                }

                                Promise.all([
                                        Product.find({ shopName: user.shopName, category: req.query.type })
                                        .skip(numberSkip)
                                        .limit(PAGE_STORE_SIZE),
                                        Product.find({ shopName: user.shopName, category: req.query.type }).countDocuments()
                                    ])
                                    .then(([products, total]) => {
                                        var totalPage = Math.ceil(total / PAGE_STORE_SIZE);

                                        var title = user.shopName + ', Cửa hàng trực tuyến | UIT - DeliveFood'

                                        res.render('store', {
                                            title,
                                            css: 'store.css',
                                            user: mongooseToObject(user),
                                            products: multipleMongooseToObject(products),
                                            category: category,
                                            message: req.flash('message'),
                                            page, //current
                                            totalPage, //pages
                                            titleProduct: 'type',
                                            key: req.query.type,
                                            isClicked: req.query.type,
                                        });
                                    })
                            })
                    })
            }
        }
    }

    // [GET] /error
    error(req, res, next) {
        res.render('404', {
            title: 'Lỗi',
            css: '404.css',
        });
    }
}

function orderArr(req, shopName) {
    var purchase = req.session.order;
    var order = [];
    for (var i in purchase) {
        if (purchase[i].item.shopName == shopName) {
            order.push(purchase[i]);
        }
    }
    return order;
}

module.exports = new SiteController;
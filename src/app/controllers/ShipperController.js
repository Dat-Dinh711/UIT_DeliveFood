const Order = require('../models/Order');
const User = require('../models/User');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');

class ShipperController {

    // [GET] /shipper/tong-quan
    index(req, res, next) {
        User.findOne({ _id: req.session.authUser._id })
            .then(user => {
                res.render('shipper/overViewShipper', {
                    layout: 'mainShipper',
                    css: 'overViewShipper.css',
                    header: 'Tổng quan trong tháng',
                    user: mongooseToObject(user),
                    messageShipper: req.flash('messageShipper'),
                    isClickedOverView: 'navbar__seller-category-item-active',
                })
            })
    }

    // [GET] /shipper/order-list
    orderList(req, res, next) {
        Order.find({ status: 'shipper' }).sort({ createdAt: -1 })
            .then(orders => {
                res.render('shipper/orderList', {
                    layout: 'mainShipper',
                    css: 'orderList.css',
                    header: 'Danh sách đơn hàng',
                    orders: multipleMongooseToObject(orders),
                    messageShipper: req.flash('messageShipper'),
                    isClickedOrderList: 'navbar__seller-category-item-active',
                })
            })
    }

    // [GET] /shipper/order-list/search
    search(req, res, next) {
        Order.find({ status: 'shipper', $text: { $search: req.query.keyword } }).sort({ createdAt: -1 })
            .then(orders => {
                res.render('shipper/orderList', {
                    layout: 'mainShipper',
                    css: 'orderList.css',
                    header: 'Danh sách đơn hàng',
                    orders: multipleMongooseToObject(orders),
                    messageShipper: req.flash('messageShipper'),
                    isClickedOrderList: 'navbar__seller-category-item-active',
                })
            })
    }

    // [GET] /shipper/order-list/:id
    orderDetail(req, res, next) {
        Order.findOne({ _id: req.params.id })
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

                res.render('shipper/orderDetail', {
                    layout: 'mainShipper',
                    css: 'orderDetail.css',
                    header: 'Danh sách đơn hàng',
                    order: mongooseToObject(order),
                    method,
                    isClickedOrderList: 'navbar__seller-category-item-active',
                })
            })
    }

    // [POST] /shipper/order-list/update/:id
    receiveOrder(req, res, next) {
        User.updateOne({ _id: req.session.authUser._id }, { totalOrderReceived: req.session.authUser.totalOrderReceived + 1 })
            .then(() => {
                req.session.authUser.totalOrderReceived = req.session.authUser.totalOrderReceived + 1
            })

        Order.updateOne({ _id: req.params.id }, {
                status: 'delivering',
                shipperName: req.session.authUser.shipperName,
                shipperAddress: req.session.authUser.shipperAddress,
                shipperPhone: req.session.authUser.phone,
                shipperLicensePlates: req.session.authUser.shipperLicensePlates,
                shipperTypeMotor: req.session.authUser.shipperTypeMotor,
            })
            .then(() => {
                req.flash('messageShipper', ['1', '2']);
                res.redirect('/shipper/order-received');
            })
    }

    // [GET] /shipper/order-received
    orderReceived(req, res, next) {
        Order.find({ shipperName: req.session.authUser.shipperName }).sort({ createdAt: -1 })
            .then(orders => {
                res.render('shipper/orderReceived', {
                    layout: 'mainShipper',
                    css: 'orderReceived.css',
                    header: 'Đơn hàng đã nhận',
                    orders: multipleMongooseToObject(orders),
                    isClickedOrderReceived: 'navbar__seller-category-item-active',
                    messageShipper: req.flash('messageShipper'),
                })
            })
    }

    // [GET] /shipper/order-received/:id
    orderReceivedDetail(req, res, next) {
        Order.findOne({ _id: req.params.id })
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

                res.render('shipper/orderReceivedDetail', {
                    layout: 'mainShipper',
                    css: 'orderDetail.css',
                    header: 'Đơn hàng đã nhận',
                    order: mongooseToObject(order),
                    method,
                    isClickedOrderReceived: 'navbar__seller-category-item-active',
                })
            })

    }

    // [POST] /shipper/order-received/complete/
    orderComplete(req, res, next) {
        User.updateOne({ _id: req.session.authUser._id }, {
                totalOrderDelivered: req.session.authUser.totalOrderDelivered + 1,
                totalRevenue: req.session.authUser.totalRevenue + parseInt(req.body.shippingFee),
            })
            .then(() => {
                req.session.authUser.totalOrderDelivered = req.session.authUser.totalOrderDelivered + 1;
                req.session.authUser.totalRevenue = req.session.authUser.totalRevenue + parseInt(req.body.shippingFee);
            })

        Order.updateOne({ _id: req.body.id }, { status: 'success-delivery', })
            .then(() => {
                res.redirect('/shipper/order-received');
            })
    }

    // [POST] /shipper/order-received/cancel/:id
    orderCancel(req, res, next) {
        User.updateOne({ _id: req.session.authUser._id }, {
                totalOrderCancel: req.session.authUser.totalOrderCancel + 1,
            })
            .then(() => {
                req.session.authUser.totalOrderCancel = req.session.authUser.totalOrderCancel + 1;
            })

        Order.updateOne({ _id: req.params.id }, {
                // status: 'shipper',
                // shipperName: '',
                // shipperAddress: '',
                // shipperPhone: '',
                // shipperLicensePlates: '',
                // shipperTypeMotor: '',
                status: 'cancel',
            })
            .then(() => {
                res.redirect('/shipper/order-received');
            })
    }

    // [GET] /shipper/info
    shipperInfo(req, res, next) {
        User.findOne({ _id: req.session.authUser._id })
            .then(user => {
                res.render('shipper/shipperInfo', {
                    layout: 'mainShipper',
                    css: 'shipperInfo.css',
                    header: 'Thông tin tài xế',
                    user: mongooseToObject(user),
                    messageShipper: req.flash('messageShipper'),
                })
            })
    }

    // [GET] /shipper/info/edit
    editShipperInfo(req, res, next) {
        User.findOne({ _id: req.session.authUser._id })
            .then(user => {
                res.render('shipper/editShipperInfo', {
                    layout: 'mainShipper',
                    css: 'editShipperInfo.css',
                    header: 'Thông tin tài xế',
                    user: mongooseToObject(user),
                })
            })
    }

    // [POST] /shipper/info/edit
    updateShipperInfo(req, res, next) {
        User.updateOne({ _id: req.session.authUser._id }, req.body)
            .then()
            .catch(next);

        Order.updateMany({ shipperName: req.session.authUser.shipperName }, req.body)
            .then(() => {
                req.session.authUser.shipperName = req.body.shipperName;
                req.session.authUser.shipperAddress = req.body.shipperAddress;
                req.session.authUser.shipperLicensePlates = req.body.shipperLicensePlates;
                req.session.authUser.shipperTypeMotor = req.body.shipperTypeMotor;
                req.flash('messageShipper', ['1', '2', '3']);
                res.redirect('/shipper/info');
            })
    }
}

module.exports = new ShipperController;
const express = require('express');
const router = express.Router();

const shipperController = require('../app/controllers/ShipperController');

router.post('/info/edit', shipperController.updateShipperInfo);
router.get('/info/edit', shipperController.editShipperInfo);
router.get('/info', shipperController.shipperInfo);
router.post('/order-received/cancel/:id', shipperController.orderCancel);
router.post('/order-received/complete', shipperController.orderComplete);
router.get('/order-received/:id', shipperController.orderReceivedDetail);
router.get('/order-received', shipperController.orderReceived);
router.get('/order-list/search', shipperController.search);
router.post('/order-list/update/:id', shipperController.receiveOrder);
router.get('/order-list/:id', shipperController.orderDetail);
router.get('/order-list', shipperController.orderList);
router.get('/overview', shipperController.index);

module.exports = router;
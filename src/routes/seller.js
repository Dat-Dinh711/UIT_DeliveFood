const express = require('express');
const multer = require('multer');
const router = express.Router();

const sellerController = require('../app/controllers/SellerController');
const upload = multer({ dest: './public/uploads/products' });
const shopAvatar = multer({ dest: './public/uploads/shopAvatars' });

router.post('/account/edit-shop', shopAvatar.single('shopAvatar'), sellerController.editShop);
router.get('/account/edit', sellerController.editAccount);
router.get('/account', sellerController.account);
router.post('/delivery-manager/update/:id', sellerController.updateDelivery);
router.get('/delivery-manager/:id', sellerController.orderDetail);
router.get('/delivery-manager', sellerController.deliveryManager);
router.get('/product-list/search', sellerController.search);
router.post('/store', upload.single('image'), sellerController.store);
router.get('/add-product', sellerController.add);
router.get('/product-list/:id/edit', sellerController.edit);
router.post('/product-list/handle-form-actions', sellerController.handleFormActions);
router.post('/product-list/:id', sellerController.delete);
router.delete('/product-list/:id/force', sellerController.destroy);
router.put('/product-list/:id', upload.single('image'), sellerController.update);
router.patch('/product-list/:id/restore', sellerController.restore);
router.get('/deleted-product-list', sellerController.deletedCourses);
router.get('/product-list', sellerController.show);
router.get('/overview', sellerController.index);

module.exports = router;
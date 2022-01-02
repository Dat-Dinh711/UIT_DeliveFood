const express = require('express');
const multer = require('multer');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const restrict = require('../app/middlewares/AuthMiddleware');

const upload = multer({ dest: './public/uploads/account' });

router.post('/account/password/change', userController.changePassword);
router.get('/account/password', userController.accountPassword);
router.post('/change-address', userController.changeAddress);
router.post('/account/address/update/:id', userController.updateAddressExec);
router.get('/account/address/update/:id', userController.updateAddress);
router.post('/account/address/add', userController.add);
router.get('/account/address', userController.accountAddress);
router.post('/account/profile/update', upload.single('avatar'), userController.updateProfile);
router.get('/account/profile', userController.account);
router.post('/review/:slug', restrict, userController.review);
router.post('/purchase/update/:id', restrict, userController.update);
router.get('/purchase', userController.purchase);

module.exports = router;
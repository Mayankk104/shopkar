const express           = require('express');
const router            = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-product',adminController.getAddProduct);
router.post('/add-product',adminController.postAddProduct);
router.post('/edit-product',adminController.postEditProduct);
router.post('/delete-product',adminController.postDeleteProduct);
router.get('/edit-product/:productId',adminController.getEditProduct);
router.get('/product',adminController.getProduct);



module.exports = router;

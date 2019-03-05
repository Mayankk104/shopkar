const express = require('express');
const router = express.Router();

const shopContorller = require('../controllers/shop');


router.get('/',shopContorller.getIndex);
router.get('/cart',shopContorller.getCart);
router.get('/chechkout',shopContorller.getCheckout);
//router.get('/index',shopContorller.getIndex);
router.get('/oders',shopContorller.getOders);
router.get('/products',shopContorller.getProduct);
router.get('/products/:productId',shopContorller.getProductDetails);
router.post('/add-to-cart',shopContorller.postAddToCart);

// router.get('/shop',shopContorller.getShop);

module.exports = router;
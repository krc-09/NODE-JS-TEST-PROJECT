const express = require('express');
const shopController = require('../controllers/shop');

const router = express.Router();

// Route to get all item
router.get('/get-items', shopController.getAdditems);

// Route to add a new item
router.post('/add-items', shopController.postAdditems);



router.put('/update-quantity/:itemId', shopController.updateItemQuantity);


module.exports = router;
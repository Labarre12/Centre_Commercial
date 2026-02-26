const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/PromotionController');
const clientController = require('../controllers/client/clientController');

router.post('/', promotionController.createPromotion);
router.get('/upcoming', clientController.getPromotionsUpcoming);
router.get('/:idPromotion', promotionController.getPromotionById);
router.put('/:idPromotion', promotionController.updatePromotion);
router.delete('/:idPromotion', promotionController.deletePromotion);

module.exports = router;

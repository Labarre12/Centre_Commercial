const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/PromotionController');

router.post('/', promotionController.createPromotion);
router.get('/:idPromotion', promotionController.getPromotionById);
router.put('/:idPromotion', promotionController.updatePromotion);
router.delete('/:idPromotion', promotionController.deletePromotion);

module.exports = router;

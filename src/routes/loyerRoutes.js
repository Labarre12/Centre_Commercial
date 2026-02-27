const express = require('express');
const router = express.Router();
const loyerController = require('../controllers/LoyerController');

router.put('/:idLoyer', loyerController.updateLoyer);
router.delete('/:idLoyer', loyerController.deleteLoyer);

module.exports = router;

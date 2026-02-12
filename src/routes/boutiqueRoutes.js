const express = require('express');
const router = express.Router();
const boutiqueController = require('../controllers/BoutiqueController');

// Obtenir une boutique par son ID
router.get('/:idBoutique', boutiqueController.getByIdBoutique);

module.exports = router;

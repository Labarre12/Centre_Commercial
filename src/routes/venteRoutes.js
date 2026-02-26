const express = require('express');
const router = express.Router();
const venteController = require('../controllers/VenteController');

router.get('/:idVente', venteController.getVenteById);

module.exports = router;

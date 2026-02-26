const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');

router.get('/:idClient', clientController.getClientById);

module.exports = router;

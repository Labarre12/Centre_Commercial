const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin/evenementController');

router.post('/', controller.createEvenement);           // Créer un événement
router.get('/', controller.getAllEvenements);           // Lister tous les événements
router.get('/:id', controller.getEvenementById);        // Voir un événement spécifique
router.put('/:id', controller.updateEvenement);         // Mettre à jour un événement

module.exports = router;

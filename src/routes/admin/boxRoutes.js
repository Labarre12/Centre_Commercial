const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin/boxController');

router.post('/', controller.createEmplacement);          // Ajouter un emplacement
router.get('/', controller.getAllEmplacements);          // Lister tous les emplacements (filtrage disponible & zone)
router.get('/:id', controller.getEmplacementById);       // Voir un emplacement spécifique
router.put('/:id', controller.updateEmplacement);       // Mettre à jour un emplacement

module.exports = router;

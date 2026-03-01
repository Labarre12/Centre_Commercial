const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/CommandeController');

router.get('/:idCommande', commandeController.getCommandeById);
router.put('/:idCommande', commandeController.updateCommande);
router.delete('/:idCommande', commandeController.deleteCommande);

module.exports = router;

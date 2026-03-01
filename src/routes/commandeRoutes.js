const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/CommandeController');

// Commander et payer en premier pour éviter conflits
router.post('/boutique/:idBoutique/commander-payer', commandeController.commanderEtPayer);

// Routes classiques commandes
router.get('/:idCommande', commandeController.getCommandeById);
router.put('/:idCommande', commandeController.updateCommande);
router.delete('/:idCommande', commandeController.deleteCommande);

module.exports = router;
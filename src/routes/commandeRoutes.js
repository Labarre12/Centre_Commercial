const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/CommandeController');

// Route de test
router.get('/test', (req, res) => {
  res.json({ message: 'Route commande fonctionne 2.0' });
});

// Commander et payer pour une boutique
router.post('/boutique/:idBoutique/commander-payer', commandeController.commanderEtPayer);

// Routes classiques sur commande
router.get('/:idCommande', commandeController.getCommandeById);
router.put('/:idCommande', commandeController.updateCommande);
router.delete('/:idCommande', commandeController.deleteCommande);

module.exports = router;
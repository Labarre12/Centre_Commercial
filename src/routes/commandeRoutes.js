const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/CommandeController');

// Route de test pour vérifier que le routeur fonctionne
router.get('/test', (req, res) => {
  res.json({ message: 'Route commande fonctionne' });
});

// Commander et payer en premier pour éviter conflits
router.post('/boutique/:idBoutique/commander-payer', commandeController.commanderEtPayer);

// Routes classiques commandes
router.get('/:idCommande', commandeController.getCommandeById);
router.put('/:idCommande', commandeController.updateCommande);
router.delete('/:idCommande', commandeController.deleteCommande);

module.exports = router;
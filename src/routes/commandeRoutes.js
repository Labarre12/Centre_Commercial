// routes/commandeRoutes.js
const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/CommandeController');

// Route de test avec debug direct
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Route commande fonctionne',
    debug: {
      route: '/test',
      method: req.method,
      url: req.originalUrl,
      timestamp: new Date().toISOString()
    }
  });
});

// Route commander-payer avec debug
router.post('/boutique/:idBoutique/commander-payer', (req, res, next) => {
  // On attache les infos de debug à la requête
  req.debug = {
    route: '/boutique/:idBoutique/commander-payer',
    params: req.params,
    body: req.body
  };
  next();
}, commandeController.commanderEtPayer);

// Route générique avec debug
router.get('/:idCommande', (req, res, next) => {
  req.debug = {
    route: '/:idCommande',
    idCommande: req.params.idCommande,
    url: req.originalUrl
  };
  next();
}, commandeController.getCommandeById);

router.put('/:idCommande', commandeController.updateCommande);
router.delete('/:idCommande', commandeController.deleteCommande);

module.exports = router;
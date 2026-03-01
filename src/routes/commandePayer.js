const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/CommandeController');

// ─── Route POST Commander et Payer ───
// URL : /api/commande-payer/:idBoutique
router.post('/:idBoutique', commandeController.commanderEtPayer);

// ─── Route de test pour debug ───
router.get('/test', (req, res) => {
  res.json({
    message: 'Page commandePayer fonctionne',
    debug: {
      route: '/test',
      method: req.method,
      url: req.originalUrl,
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/CommandeController');

// ─── Route de test DOIT être en PREMIER ───
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

// ─── Route POST Commander et Payer EN SECOND ───
// URL : /api/commande-payer/:idBoutique
router.post('/:idBoutique', commandeController.commanderEtPayer);

module.exports = router;
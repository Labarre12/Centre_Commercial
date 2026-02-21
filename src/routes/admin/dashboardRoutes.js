const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/admin/dashboardController');

// Clients
router.get('/clients/count', dashboard.getTotalClients);
router.get('/clients', dashboard.getClientsByFilter);
router.get('/clients/top-buyers', dashboard.getTopBuyers);
router.get('/clients/top-spenders', dashboard.getTopSpenders);
router.get('/clients/:idAcheteur/history', dashboard.getClientHistory);

// Boutiques
router.get('/boutiques/top-sales', dashboard.getTopBoutiques);
router.get('/boutiques/:idBoutique/sales', dashboard.getSalesByBoutique);

// Produits
router.get('/products/top-sales', dashboard.getTopProducts);

// Statistiques
router.get('/sales', dashboard.getSalesByPeriod);

module.exports = router;

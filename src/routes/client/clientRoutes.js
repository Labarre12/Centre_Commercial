const express = require('express');
const router = express.Router();
const clientController = require('../../controllers/client/clientController');
const profilController = require('../../controllers/client/profilController');
const foodcourtController = require('../../controllers/client/foodcourtController');
const promotionClientController = require('../../controllers/client/promotionClientController');
const boutiqueClientController = require('../../controllers/client/boutiqueClientController');
const commandeClientController = require('../../controllers/client/commandeClientController');
const avisClientController = require('../../controllers/client/avisClientController');

// Agenda / horaires
router.get('/boutiques/agenda', clientController.getAgendaBoutiques);
router.get('/promotions/upcoming', clientController.getPromotionsUpcoming);
router.get('/boutiques/:idBoutique/horaire', clientController.getHoraireBoutique);

// Promotions disponibles
// GET /api/promotions/:idPromotion → géré par promotionRoutes
router.get('/promotions', promotionClientController.getPromotions);

// Boutiques disponibles (routes statiques avant dynamiques)
// GET /api/boutiques et GET /api/boutiques/:idBoutique → gérés par boutiqueRoutes
router.get('/boutiques/open', boutiqueClientController.getBoutiquesOpen);
router.get('/boutiques/foodcourt', foodcourtController.getBoutiquesFoodcourt);
router.get('/boutiques/foodcourt/:idBoutique', foodcourtController.getDetailBoutiqueFoodcourt);

// Commandes
// GET /api/commandes/:idCommande et DELETE /api/commandes/:idCommande → gérés par commandeRoutes
router.post('/commandes', commandeClientController.passerCommande);
router.get('/clients/:idClient/commandes', commandeClientController.getCommandesClient);

// Avis client
router.post('/produits/:idProduit/avis', avisClientController.addAvis);
router.get('/produits/:idProduit/avis', avisClientController.getAvisByProduit);
router.put('/avis/:idAvis', avisClientController.updateAvis);
router.delete('/avis/:idAvis', avisClientController.deleteAvis);

// Profil client
router.get('/clients/:idClient', profilController.getProfilClient);
router.put('/clients/:idClient', profilController.updateProfilClient);
router.delete('/clients/:idClient', profilController.deleteProfilClient);

module.exports = router;

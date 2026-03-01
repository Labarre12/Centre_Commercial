const express = require('express');
const router = express.Router();
const clientController = require('../../controllers/client/clientController');
const profilController = require('../../controllers/client/profilController');
const foodcourtController = require('../../controllers/client/foodcourtController');
const promotionClientController = require('../../controllers/client/promotionClientController');
const commandeClientController = require('../../controllers/client/commandeClientController');
const avisClientController = require('../../controllers/client/avisClientController');
const parkingController = require('../../controllers/client/parkingController');

// Parking
router.get('/parking/stats', parkingController.getParkingStats);
router.get('/parking', parkingController.getParking);

// Agenda / horaires
router.get('/boutiques/:idBoutique/horaire', clientController.getHoraireBoutique);

// Promotions disponibles
// GET /api/promotions/:idPromotion → géré par promotionRoutes
router.get('/promotions', promotionClientController.getPromotions);

// Foodcourt détail (liste gérée par boutiqueRoutes)
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

//commande et payer
router.post("/commandes/:idBoutique/commander-payer", controller.commanderEtPayer);

module.exports = router;

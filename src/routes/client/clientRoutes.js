const express = require('express');
const router = express.Router();
const clientController = require('../../controllers/client/clientController');
const profilController = require('../../controllers/client/profilController');
const foodcourtController = require('../../controllers/client/foodcourtController');
const connexionController = require('../../controllers/client/connexionController');
const promotionClientController = require('../../controllers/client/promotionClientController');
const boutiqueClientController = require('../../controllers/client/boutiqueClientController');
const commandeClientController = require('../../controllers/client/commandeClientController');
const avisClientController = require('../../controllers/client/avisClientController');

// Agenda / horaires
router.get('/boutiques/agenda', clientController.getAgendaBoutiques);
router.get('/promotions/upcoming', clientController.getPromotionsUpcoming);
router.get('/boutiques/:idBoutique/horaire', clientController.getHoraireBoutique);

// Promotions disponibles
router.get('/promotions', promotionClientController.getPromotions);
router.get('/promotions/:idPromotion', promotionClientController.getPromotionById);

// Boutiques disponibles (routes statiques avant dynamiques)
router.get('/boutiques/open', boutiqueClientController.getBoutiquesOpen);
router.get('/boutiques/foodcourt', foodcourtController.getBoutiquesFoodcourt);
router.get('/boutiques/foodcourt/:idBoutique', foodcourtController.getDetailBoutiqueFoodcourt);
router.get('/boutiques', boutiqueClientController.getBoutiques);
router.get('/boutiques/:idBoutique', boutiqueClientController.getBoutiqueById);

// Commandes
router.post('/commandes', commandeClientController.passerCommande);
router.get('/clients/:idClient/commandes', commandeClientController.getCommandesClient);
router.get('/commandes/:idCommande', commandeClientController.getCommandeById);
router.delete('/commandes/:idCommande', commandeClientController.annulerCommande);

// Avis client
router.post('/produits/:idProduit/avis', avisClientController.addAvis);
router.get('/produits/:idProduit/avis', avisClientController.getAvisByProduit);
router.put('/avis/:idAvis', avisClientController.updateAvis);
router.delete('/avis/:idAvis', avisClientController.deleteAvis);

// Profil client
router.get('/clients/:idClient', profilController.getProfilClient);
router.put('/clients/:idClient', profilController.updateProfilClient);
router.delete('/clients/:idClient', profilController.deleteProfilClient);

// Connexion client
router.post('/connexion/register', connexionController.register);
router.post('/connexion/login', connexionController.login);
router.post('/connexion/logout', connexionController.logout);

module.exports = router;

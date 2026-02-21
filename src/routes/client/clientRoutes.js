const express = require('express');
const router = express.Router();
const clientController = require('../../controllers/client/clientController');
const profilController = require('../../controllers/client/profilController');
const foodcourtController = require('../../controllers/client/foodcourtController');
const connexionController = require('../../controllers/client/connexionController');

//agenda
router.get('/boutiques/agenda', clientController.getAgendaBoutiques);
router.get('/promotions/upcoming', clientController.getPromotionsUpcoming);
router.get('/boutiques/:idBoutique/horaire', clientController.getHoraireBoutique);

// Profil client
router.get('/clients/:idClient', profilController.getProfilClient);
router.put('/clients/:idClient', profilController.updateProfilClient);

// Boutiques Foodcourt
router.get('/boutiques/foodcourt', foodcourtController.getBoutiquesFoodcourt);
router.get('/boutiques/foodcourt/:idBoutique', foodcourtController.getDetailBoutiqueFoodcourt);

//connexion client
router.post('/connexion/register', connexionController.register);
router.post('/connexion/login', connexionController.login);
router.post('/connexion/logout', connexionController.logout);

module.exports = router;
const express = require('express');
const router = express.Router();
const boutiqueController = require('../controllers/BoutiqueController');
const produitController = require('../controllers/ProduitController');
const loyerController = require('../controllers/LoyerController');
const promotionController = require('../controllers/PromotionController');
const venteController = require('../controllers/VenteController');
const employeController = require('../controllers/EmployeController');
const commandeController = require('../controllers/CommandeController');
const clientController   = require('../controllers/client/clientController');

// Profil boutique
router.get('/', boutiqueController.getAllBoutiques);
router.get('/open', boutiqueController.getBoutiquesOuvertes);
router.get('/foodcourt', boutiqueController.getBoutiquesFoodcourt);
router.get('/agenda', clientController.getAgendaBoutiques);
router.get('/:idBoutique', boutiqueController.getByIdBoutique);
router.put('/:idBoutique', boutiqueController.updateBoutique);

// Produits
router.post('/:idBoutique/produits', produitController.addProduitToBoutique);
router.get('/:idBoutique/produits', produitController.getListProduit);

// Clients
router.get('/:idBoutique/clients/top', boutiqueController.getTopClients);
router.get('/:idBoutique/clients', boutiqueController.getClients);

// Loyer
router.post('/:idBoutique/loyer', loyerController.addLoyer);
router.get('/:idBoutique/loyer', loyerController.getLoyersByBoutique);

// Promotions
router.get('/:idBoutique/promotions', promotionController.getPromotionsByBoutique);

// Ventes
router.get('/:idBoutique/ventes/stats', venteController.getVentesStats);
router.get('/:idBoutique/ventes', venteController.getVentesByBoutique);

// Employés
router.post('/:idBoutique/employes', employeController.addEmploye);
router.get('/:idBoutique/employes', employeController.getEmployesByBoutique);

// Commandes
router.post('/:idBoutique/commandes', commandeController.createCommande);
router.get('/:idBoutique/commandes', commandeController.getCommandesByBoutique);

module.exports = router;

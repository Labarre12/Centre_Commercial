const express = require('express');
const router = express.Router();
const produitController = require('../controllers/ProduitController');

// Insérer un nouveau produit
router.post('/', produitController.insertProduit);

// Obtenir tous les produits (avec limite optionnelle)
router.get('/', produitController.getAllProduits);

// Obtenir tous les produits d'une boutique
router.get('/boutique/:idBoutique', produitController.getListProduit);

// Obtenir un produit par son ID
router.get('/:idProduit', produitController.getProduitByIDProduit);

// Modifier un produit
router.put('/:idProduit', produitController.updateProduit);

// Supprimer un produit
router.delete('/:idProduit', produitController.deleteProduit);

module.exports = router;

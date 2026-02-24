const Produit = require('../models/Produit');

// Insérer un produit (route générique)
exports.insertProduit = async (req, res) => {
  try {
    const produit = await Produit.insertProduit(req.body);
    res.status(201).json(produit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ajouter un produit via la route boutique
exports.addProduitToBoutique = async (req, res) => {
  try {
    const produit = await Produit.insertProduit({ ...req.body, idboutique: req.params.idBoutique });
    res.status(201).json(produit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les produits d'une boutique
exports.getListProduit = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const { idCategorieProduit, idLiaisonCouleur, promotionActive } = req.query;

    const filter = { idboutique: idBoutique };
    if (idCategorieProduit) filter.idCategorieProduit = idCategorieProduit;
    if (idLiaisonCouleur) filter.idLiaisonCouleur = idLiaisonCouleur;

    const produits = await Produit.find(filter);

    if (produits.length === 0) {
      return res.status(404).json({ message: 'Aucun produit trouvé pour cette boutique' });
    }
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un produit par ID
exports.getProduitByIDProduit = async (req, res) => {
  try {
    const { idProduit } = req.params;
    const produit = await Produit.getProduitByIDProduit(idProduit);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json(produit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier un produit
exports.updateProduit = async (req, res) => {
  try {
    const { idProduit } = req.params;
    const produit = await Produit.findOneAndUpdate(
      { idProduit },
      req.body,
      { new: true }
    );
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json(produit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un produit
exports.deleteProduit = async (req, res) => {
  try {
    const { idProduit } = req.params;
    const produit = await Produit.findOneAndDelete({ idProduit });
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json({ message: 'Produit supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

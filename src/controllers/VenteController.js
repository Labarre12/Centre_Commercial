const Vente = require('../models/Vente');

// Lister les ventes d'une boutique
exports.getVentesByBoutique = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const { dateDebut, dateFin, idAcheteur, idProduit } = req.query;

    const filter = { idBoutique };
    if (idAcheteur) filter.idAcheteur = idAcheteur;
    if (idProduit) filter.idProduit = idProduit;
    if (dateDebut || dateFin) {
      filter.createdAt = {};
      if (dateDebut) filter.createdAt.$gte = new Date(dateDebut);
      if (dateFin) filter.createdAt.$lte = new Date(dateFin);
    }

    const ventes = await Vente.find(filter);
    res.status(200).json(ventes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Voir une vente par ID
exports.getVenteById = async (req, res) => {
  try {
    const vente = await Vente.findOne({ idVente: req.params.idVente });
    if (!vente) {
      return res.status(404).json({ message: 'Vente non trouvée' });
    }
    res.status(200).json(vente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Statistiques des ventes d'une boutique
exports.getVentesStats = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const { dateDebut, dateFin } = req.query;

    const filter = { idBoutique };
    if (dateDebut || dateFin) {
      filter.createdAt = {};
      if (dateDebut) filter.createdAt.$gte = new Date(dateDebut);
      if (dateFin) filter.createdAt.$lte = new Date(dateFin);
    }

    const ventes = await Vente.find(filter);

    // Chiffre d'affaires total
    const chiffreAffaires = ventes.reduce((sum, v) => sum + v.prix * v.quantite, 0);

    // Top produits
    const produitMap = {};
    for (const vente of ventes) {
      if (!produitMap[vente.idProduit]) {
        produitMap[vente.idProduit] = { idProduit: vente.idProduit, quantiteVendue: 0, chiffre: 0 };
      }
      produitMap[vente.idProduit].quantiteVendue += vente.quantite;
      produitMap[vente.idProduit].chiffre += vente.prix * vente.quantite;
    }
    const topProduits = Object.values(produitMap).sort((a, b) => b.quantiteVendue - a.quantiteVendue);

    res.status(200).json({
      chiffreAffaires,
      nbVentes: ventes.length,
      topProduits,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

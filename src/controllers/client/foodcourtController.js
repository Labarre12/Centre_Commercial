const Boutique = require('../../models/Boutique');

// Liste boutiques Foodcourt
exports.getBoutiquesFoodcourt = async (req, res) => {
  try {
    const { ouverture, fermeture, idCategorie } = req.query;
    let filter = { categorie: { $in: ['Restaurant', 'Café', 'Fast Food', 'Restauration'] } };

    if (ouverture) filter.ouverture = { $lte: ouverture };
    if (fermeture) filter.fermeture = { $gte: fermeture };
    if (idCategorie) filter.idCategorie = Number(idCategorie);

    const boutiques = await Boutique.find(filter).select('idboutique libelle ouverture fermeture description dateDebut dateFin url idCategorie');
    res.json(boutiques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Détails boutique Foodcourt
exports.getDetailBoutiqueFoodcourt = async (req, res) => {
  try {
    const { idBoutique } = req.params;

    const boutique = await Boutique.findOne({ idboutique: idBoutique });
    if (!boutique) return res.status(404).json({ message: 'Boutique Foodcourt non trouvée' });

    res.json({
      idBoutique: boutique.idboutique,
      libelle: boutique.libelle,
      description: boutique.description,
      ouverture: boutique.ouverture,
      fermeture: boutique.fermeture,
      dateDebut: boutique.dateDebut,
      dateFin: boutique.dateFin,
      url: boutique.url,
      idCategorie: boutique.idCategorie
      // Ici on peut ajouter plus de champs si nécessaire, comme promotions ou produits liés
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
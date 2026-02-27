const Boutique = require('../../models/Boutique');

// Liste toutes les boutiques
exports.getBoutiques = async (req, res) => {
  try {
    const { idCategorie, ouverture } = req.query;

    const filter = {};
    if (idCategorie) filter.idCategorie = Number(idCategorie);
    if (ouverture) filter.ouverture = ouverture;

    const boutiques = await Boutique.find(filter);
    res.status(200).json(boutiques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Détails d'une boutique
exports.getBoutiqueById = async (req, res) => {
  try {
    const boutique = await Boutique.findOne({ idboutique: req.params.idBoutique });
    if (!boutique) {
      return res.status(404).json({ message: 'Boutique non trouvée' });
    }
    res.status(200).json(boutique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Boutiques ouvertes à l'heure actuelle
exports.getBoutiquesOpen = async (req, res) => {
  try {
    const { heure } = req.query;

    // Format HH:MM de l'heure courante ou celle passée en query
    const now = heure || new Date().toTimeString().slice(0, 5);

    const boutiques = await Boutique.find({
      ouverture: { $lte: now },
      $or: [
        { fermeture: { $gte: now } },
        { fermeture: { $exists: false } },
        { fermeture: '' },
      ],
    });

    res.status(200).json(boutiques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

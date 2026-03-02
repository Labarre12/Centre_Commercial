const Loyer = require('../models/Loyer');

// Ajouter un paiement de loyer
exports.addLoyer = async (req, res) => {
  try {
    const loyer = new Loyer({ ...req.body, idboutique: req.params.idBoutique });
    await loyer.save();
    res.status(201).json(loyer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lister les paiements d'une boutique
exports.getLoyersByBoutique = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const { mois, annee, idStatus } = req.query;

    const filter = { idboutique: idBoutique };
    if (mois) filter.mois = Number(mois);
    if (annee) filter.annee = Number(annee);
    if (idStatus) filter.idStatus = idStatus;

    const loyers = await Loyer.find(filter);
    res.status(200).json(loyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier un paiement
exports.updateLoyer = async (req, res) => {
  try {
    const loyer = await Loyer.findOneAndUpdate(
      { idLoyer: req.params.idLoyer },
      req.body,
      { new: true }
    );
    if (!loyer) {
      return res.status(404).json({ message: 'Paiement non trouvé' });
    }
    res.status(200).json(loyer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un paiement
exports.deleteLoyer = async (req, res) => {
  try {
    const loyer = await Loyer.findOneAndDelete({ idLoyer: req.params.idLoyer });
    if (!loyer) {
      return res.status(404).json({ message: 'Paiement non trouvé' });
    }
    res.status(200).json({ message: 'Paiement supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

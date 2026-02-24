const Avis = require('../../models/Avis_client');

// Ajouter un avis pour un produit
exports.addAvis = async (req, res) => {
  try {
    const avis = new Avis({ ...req.body, idProduit: req.params.idProduit });
    await avis.save();
    res.status(201).json(avis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lister les avis d'un produit
exports.getAvisByProduit = async (req, res) => {
  try {
    const { notation, dateDebut, dateFin } = req.query;

    const filter = { idProduit: req.params.idProduit };
    if (notation) filter.notation = Number(notation);
    if (dateDebut || dateFin) {
      filter.date = {};
      if (dateDebut) filter.date.$gte = new Date(dateDebut);
      if (dateFin) filter.date.$lte = new Date(dateFin);
    }

    const avis = await Avis.find(filter);
    res.status(200).json(avis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier un avis
exports.updateAvis = async (req, res) => {
  try {
    const avis = await Avis.findOneAndUpdate(
      { idAvis: req.params.idAvis },
      req.body,
      { new: true }
    );
    if (!avis) {
      return res.status(404).json({ message: 'Avis non trouvé' });
    }
    res.status(200).json(avis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un avis
exports.deleteAvis = async (req, res) => {
  try {
    const avis = await Avis.findOneAndDelete({ idAvis: req.params.idAvis });
    if (!avis) {
      return res.status(404).json({ message: 'Avis non trouvé' });
    }
    res.status(200).json({ message: 'Avis supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

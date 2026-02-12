const Boutique = require('../models/Boutique');

// Obtenir une boutique par ID
exports.getByIdBoutique = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const boutique = await Boutique.getByIdBoutique(idBoutique);
    if (!boutique) {
      return res.status(404).json({ message: 'Boutique non trouvée' });
    }
    res.status(200).json(boutique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

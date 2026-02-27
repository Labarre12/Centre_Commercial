const Promotion = require('../models/Promotion');

// Créer une promotion
exports.createPromotion = async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lister les promotions d'une boutique
exports.getPromotionsByBoutique = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const { actif } = req.query;

    const filter = { idBoutiques: idBoutique };
    if (actif !== undefined) filter.actif = actif === 'true';

    const promotions = await Promotion.find(filter);
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Voir une promotion par ID
exports.getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.idPromotion);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion non trouvée' });
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier une promotion
exports.updatePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.idPromotion,
      req.body,
      { new: true }
    );
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion non trouvée' });
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une promotion
exports.deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.idPromotion);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion non trouvée' });
    }
    res.status(200).json({ message: 'Promotion supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

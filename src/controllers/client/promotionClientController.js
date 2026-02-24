const Promotion = require('../../models/Promotion');

// Liste des promotions actives
exports.getPromotions = async (req, res) => {
  try {
    const { idBoutique, typeReduction } = req.query;

    const filter = { actif: true, dateFin: { $gte: new Date() } };
    if (idBoutique) filter.idBoutiques = idBoutique;
    if (typeReduction) filter.typeReduction = typeReduction;

    const promotions = await Promotion.find(filter);
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Détails d'une promotion
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

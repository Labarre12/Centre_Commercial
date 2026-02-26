const Boutique   = require('../../models/Boutique');
const Evenement  = require('../../models/Evenement');
const Promotion  = require('../../models/Promotion');
const ParticipationBoutique = require('../../models/Participation_boutique');

// Voir agenda boutiques
exports.getAgendaBoutiques = async (req, res) => {
  try {
    const { date, boutiqueId } = req.query;
    let filter = {};

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      filter.dateDebut = { $lte: end };
      filter.dateFin = { $gte: start };
    }

    if (boutiqueId) {
      filter.idboutique = boutiqueId;
    }

    const boutiques = await Boutique.find(filter).select('idboutique libelle ouverture fermeture dateDebut dateFin categorie');
    res.json(boutiques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Voir promotions à venir
exports.getPromotionsUpcoming = async (req, res) => {
  try {
    const { boutiqueId, typeReduction } = req.query;
    let filter = { dateFin: { $gte: new Date() } }; // Promotions encore actives

    if (boutiqueId) filter.idboutique = boutiqueId;
    if (typeReduction) filter.typeReduction = typeReduction;

    const promotions = await Promotion.find(filter).select('titre description idBoutiques typeReduction valeur dateDebut dateFin actif');
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Voir horaires d’une boutique
exports.getHoraireBoutique = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const { jour } = req.query;

    const boutique = await Boutique.findOne({ idboutique: idBoutique }).select('idboutique libelle ouverture fermeture');

    if (!boutique) return res.status(404).json({ message: 'Boutique non trouvée' });

    res.json({
      idBoutique: boutique.idboutique,
      libelle: boutique.libelle,
      ouverture: boutique.ouverture,
      fermeture: boutique.fermeture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const Evenement = require('../../models/Evenement');
const Participation = require('../../models/Participation_boutique');

// ✅ Créer un événement
exports.createEvenement = async (req, res) => {
  try {
    const evenement = new Evenement(req.body);
    await evenement.save();
    res.status(201).json(evenement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Lister tous les événements
exports.getAllEvenements = async (req, res) => {
  try {
    const { idBoutique, dateActives, idStatus } = req.query;
    let filter = {};

    if (idBoutique) {
      // On vérifie les participations
      const participations = await Participation.find({ idboutique: idBoutique });
      const idsEvenements = participations.map(p => p.idevenement);
      filter.idevenement = { $in: idsEvenements };
    }

    if (dateActives === "true") {
      const now = new Date();
      filter.dateDebut = { $lte: now };
      filter.dateFin = { $gte: now };
    }

    if (idStatus) {
      filter.idStatus = idStatus;
    }

    const evenements = await Evenement.find(filter);
    res.json(evenements);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Voir un événement
exports.getEvenementById = async (req, res) => {
  try {
    const evenement = await Evenement.findById(req.params.id);
    if (!evenement) {
      return res.status(404).json({ message: "Événement introuvable" });
    }
    res.json(evenement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Lister toutes les participations boutique ↔ événement
exports.getAllParticipations = async (req, res) => {
  try {
    const participations = await Participation.find();
    res.json(participations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Mettre à jour un événement
exports.updateEvenement = async (req, res) => {
  try {
    const evenement = await Evenement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(evenement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

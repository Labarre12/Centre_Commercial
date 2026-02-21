const Emplacement = require('../../models/Emplacement');

// ✅ Ajouter un emplacement
exports.createEmplacement = async (req, res) => {
  try {
    const emplacement = new Emplacement(req.body);
    await emplacement.save();
    res.status(201).json(emplacement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Lister tous les emplacements avec filtre
exports.getAllEmplacements = async (req, res) => {
  try {
    const { disponible, zone } = req.query;
    let filter = {};

    if (disponible !== undefined) {
      filter.disponible = disponible === "true"; // true/false
    }

    if (zone) {
      filter.numero = zone; // filtre par numéro (= nom de zone)
    }

    const emplacements = await Emplacement.find(filter);
    res.json(emplacements);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Voir un emplacement spécifique
exports.getEmplacementById = async (req, res) => {
  try {
    const emplacement = await Emplacement.findById(req.params.id);
    if (!emplacement) {
      return res.status(404).json({ message: "Emplacement introuvable" });
    }
    res.json(emplacement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Mettre à jour un emplacement
exports.updateEmplacement = async (req, res) => {
  try {
    const emplacement = await Emplacement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(emplacement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

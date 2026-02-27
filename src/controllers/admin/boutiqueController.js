const Boutique = require('../../models/Boutique');
const Loyer = require('../../models/Loyer');


// Créer une boutique
exports.createBoutique = async (req, res) => {
  try {
    const boutique = new Boutique(req.body);
    await boutique.save();
    res.status(201).json(boutique);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Lister toutes les boutiques
exports.getAllBoutiques = async (req, res) => {
  try {
    const boutiques = await Boutique.find();
    res.json(boutiques);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Boutiques ouvertes
exports.getOpenBoutiques = async (req, res) => {
  try {
    const now = new Date();
    const currentHour = now.toTimeString().slice(0,5); // "14:30"

    const boutiques = await Boutique.find({
      ouverture: { $lte: currentHour },
      fermeture: { $gte: currentHour }
    });

    res.json(boutiques);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Boutiques fermées
exports.getClosedBoutiques = async (req, res) => {
  try {
    const now = new Date();
    const currentHour = now.toTimeString().slice(0,5);

    const boutiques = await Boutique.find({
      $or: [
        { ouverture: { $gt: currentHour } },
        { fermeture: { $lt: currentHour } }
      ]
    });

    res.json(boutiques);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Par catégorie
exports.getByCategorie = async (req, res) => {
  try {
    const boutiques = await Boutique.find({
      idCategorie: Number(req.params.idCategorie)
    });

    res.json(boutiques);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update
exports.updateBoutique = async (req, res) => {
  try {
    const boutique = await Boutique.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(boutique);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete
exports.deleteBoutique = async (req, res) => {
  try {
    await Boutique.findByIdAndDelete(req.params.id);
    res.json({ message: "Boutique supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Loyer (payé ou non)
exports.getBoutiquesQuiOntPaye = async (req, res) => {
  try {
    const now = new Date();

    const debutMois = new Date(now.getFullYear(), now.getMonth(), 1);
    const finMois = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const loyers = await Loyer.find({
      datePaiement: {
        $gte: debutMois,
        $lte: finMois
      }
    });

    res.json(loyers);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//loyer non payé
exports.getBoutiquesNonPaye = async (req, res) => {
  try {

    const now = new Date();

    const debutMois = new Date(now.getFullYear(), now.getMonth(), 1);
    const finMois = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // boutiques qui ont payé
    const loyers = await Loyer.find({
      datePaiement: {
        $gte: debutMois,
        $lte: finMois
      }
    });

    const boutiquesPaye = loyers.map(l => l.idboutique);

    // toutes les boutiques sauf celles qui ont payé
    const boutiquesNonPaye = await Boutique.find({
      idboutique: { $nin: boutiquesPaye }
    });

    res.json(boutiquesNonPaye);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
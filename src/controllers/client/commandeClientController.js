const Commande = require('../../models/Commande');

// Passer une commande
exports.passerCommande = async (req, res) => {
  try {
    const commande = new Commande(req.body);
    await commande.save();
    res.status(201).json(commande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Historique des commandes d'un client
exports.getCommandesClient = async (req, res) => {
  try {
    const { idClient } = req.params;
    const { idstatus, dateDebut, dateFin } = req.query;

    const filter = { idAcheteur: idClient };
    if (idstatus) filter.idstatus = idstatus;
    if (dateDebut || dateFin) {
      filter.createdAt = {};
      if (dateDebut) filter.createdAt.$gte = new Date(dateDebut);
      if (dateFin) filter.createdAt.$lte = new Date(dateFin);
    }

    const commandes = await Commande.find(filter);
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Détails d'une commande
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findOne({ idcommande: req.params.idCommande });
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Annuler une commande
exports.annulerCommande = async (req, res) => {
  try {
    const commande = await Commande.findOne({ idcommande: req.params.idCommande });
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    if (commande.idstatus === 'livree') {
      return res.status(400).json({ message: 'Impossible d\'annuler une commande déjà livrée' });
    }
    await Commande.findOneAndDelete({ idcommande: req.params.idCommande });
    res.status(200).json({ message: 'Commande annulée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

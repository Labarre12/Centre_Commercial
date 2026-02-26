const Acheteur = require('../models/Acheteur');
const Vente = require('../models/Vente');
const Commande = require('../models/Commande');

// Voir les détails d'un client
exports.getClientById = async (req, res) => {
  try {
    const { idClient } = req.params;
    const acheteur = await Acheteur.findOne({ idAcheteur: idClient });
    if (!acheteur) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    const historique = await Vente.find({ idAcheteur: idClient });
    const commandes = await Commande.find({ idAcheteur: idClient });

    res.status(200).json({ ...acheteur.toObject(), historique, commandes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

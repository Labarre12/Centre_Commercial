const Acheteur = require('../../models/Acheteur');
const bcrypt = require('bcrypt');

// Voir profil client
exports.getProfilClient = async (req, res) => {
  try {
    const { idClient } = req.params;

    const client = await Acheteur.findOne({ idAcheteur: idClient }).select('idAcheteur nom mail contact adresse dateInscription');

    if (!client) return res.status(404).json({ message: 'Client non trouvé' });

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier profil client
exports.updateProfilClient = async (req, res) => {
  try {
    const { idClient } = req.params;
    const { nom, mail, contact, adresse, mdp } = req.body;

    const client = await Acheteur.findOne({ idAcheteur: idClient });
    if (!client) return res.status(404).json({ message: 'Client non trouvé' });

    // Mettre à jour uniquement les champs fournis
    if (nom) client.nom = nom;
    if (mail) client.mail = mail;
    if (contact) client.contact = contact;
    if (adresse) client.adresse = adresse;
    if (mdp) client.mdp = await bcrypt.hash(mdp, 10);

    await client.save();

    res.json({ message: 'Profil mis à jour avec succès', client });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer compte client
exports.deleteProfilClient = async (req, res) => {
  try {
    const { idClient } = req.params;
    const client = await Acheteur.findOneAndDelete({ idAcheteur: idClient });
    if (!client) return res.status(404).json({ message: 'Client non trouvé' });
    res.json({ message: 'Compte supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const Commande = require('../models/Commande');
const Vente = require('../models/Vente');

// Créer une commande
exports.createCommande = async (req, res) => {
  try {
    const commande = new Commande({ ...req.body, idboutique: req.params.idBoutique });
    await commande.save();
    res.status(201).json(commande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Lister les commandes d'une boutique
exports.getCommandesByBoutique = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const { idstatus, idAcheteur, dateDebut, dateFin } = req.query;

    const filter = { idboutique: idBoutique };
    if (idstatus) filter.idstatus = idstatus;
    if (idAcheteur) filter.idAcheteur = idAcheteur;
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

// Voir une commande par ID
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

// Modifier une commande
exports.updateCommande = async (req, res) => {
  try {
    const commande = await Commande.findOneAndUpdate(
      { idcommande: req.params.idCommande },
      req.body,
      { new: true }
    );
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Annuler une commande
exports.deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findOneAndDelete({ idcommande: req.params.idCommande });
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.status(200).json({ message: 'Commande annulée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//commander et payer
exports.commanderEtPayer = async (req, res) => {
  const debug = req.debug || { message: 'Pas de debug' };
  
  try {
    const { idBoutique } = req.params;
    const { idProduit, quantite, prix, idAcheteur, adresseLivraison } = req.body;

    // Vérification des champs
    const missingFields = [];
    if (!idProduit) missingFields.push('idProduit');
    if (!quantite) missingFields.push('quantite');
    if (!prix) missingFields.push('prix');
    if (!idAcheteur) missingFields.push('idAcheteur');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: "Champs manquants",
        missingFields,
        debug: {
          ...debug,
          body: req.body,
          params: req.params,
          timestamp: new Date().toISOString()
        }
      });
    }

    // Création commande
    const commande = new Commande({
      numero_commande: "CMD-" + Date.now(),
      idboutique: idBoutique,
      produits: [{ idproduit: idProduit, quantite }],
      idAcheteur,
      idstatus: "PAYEE",
      adresseLivraison
    });

    await commande.save();

    // Création vente
    const vente = new Vente({
      idBoutique: idBoutique,
      idProduit,
      quantite,
      prix,
      idAcheteur
    });

    await vente.save();

    res.status(201).json({
      message: "Commande et paiement effectués avec succès",
      commande,
      vente,
      debug: {
        ...debug,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    res.status(500).json({ 
      message: error.message,
      debug: {
        ...debug,
        error: error.toString(),
        stack: error.stack,
        timestamp: new Date().toISOString()
      }
    });
  }
};

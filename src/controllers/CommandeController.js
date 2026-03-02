const Commande = require('../models/Commande');
const Vente = require('../models/Vente');
const Produit = require('../models/Produit');


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

// Modifier une commande (général)
// Si le statut est modifié vers "PAYEE" et qu'il ne l'était pas auparavant,
// on crée les enregistrements correspondants dans la table `Vente`.
exports.updateCommande = async (req, res) => {
  try {
    // trouver la commande existante pour connaître l'ancien statut
    const commande = await Commande.findOne({ idcommande: req.params.idCommande });
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    const ancienStatus = commande.idstatus;

    // appliquer les changements reçus
    Object.assign(commande, req.body);
    await commande.save();

    let ventes = [];

    if (ancienStatus !== commande.idstatus && commande.idstatus === 'PAYEE') {
      // créer une vente pour chaque produit de la commande
      for (const item of commande.produits) {
        // tenter de récupérer le prix à partir du produit
        let prix = 0;
        try {
          const prod = await Produit.findOne({ idProduit: item.idproduit }).select('prix');
          if (prod) prix = prod.prix;
        } catch (err) {
          // ignore, on gardera 0
        }
        const vente = new Vente({
          idBoutique: commande.idboutique,
          idProduit: item.idproduit,
          quantite: item.quantite,
          prix,
          idAcheteur: commande.idAcheteur,
        });
        await vente.save();
        ventes.push(vente);
      }
    }

    res.status(200).json({ commande, ventes });
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
// Mettre à jour uniquement le statut et éventuellement déclencher l'insertion en ventes
exports.updateStatut = async (req, res) => {
  try {
    const { idCommande } = req.params;
    const { idstatus } = req.body;
    if (!idstatus) {
      return res.status(400).json({ message: 'idstatus requis' });
    }

    const commande = await Commande.findOne({ idcommande: idCommande });
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    const ancienStatus = commande.idstatus;
    commande.idstatus = idstatus;
    await commande.save();

    let ventes = [];
    if (ancienStatus !== 'PAYEE' && idstatus === 'PAYEE') {
      for (const item of commande.produits) {
        let prix = 0;
        try {
          const prod = await Produit.findOne({ idProduit: item.idproduit }).select('prix');
          if (prod) prix = prod.prix;
        } catch (err) {}
        const vente = new Vente({
          idBoutique: commande.idboutique,
          idProduit: item.idproduit,
          quantite: item.quantite,
          prix,
          idAcheteur: commande.idAcheteur,
        });
        await vente.save();
        ventes.push(vente);
      }
    }

    // Mettre le statut à CONFIRME à la fin
    commande.idstatus = 'CONFIRME';
    await commande.save();

    res.status(200).json({ commande, ventes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const Commande = require('../models/Commande');

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

// Commander et payer
exports.commanderEtPayer = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const { idProduit, quantite, prix, idAcheteur, adresseLivraison } = req.body;

    // Vérification des champs obligatoires
    if (!idProduit || !quantite || !prix || !idAcheteur) {
      return res.status(400).json({ 
        success: false,
        message: "Champs manquants. idProduit, quantite, prix et idAcheteur sont requis" 
      });
    }

    // Vérifier que la boutique existe (avec votre identifiant personnalisé BTQ001)
    let boutique;
    
    // Si idBoutique est un ObjectId MongoDB (24 caractères hexadécimaux)
    if (idBoutique.match(/^[0-9a-fA-F]{24}$/)) {
      boutique = await Boutique.findById(idBoutique);
    } else {
      // Sinon rechercher par le champ 'id' personnalisé (comme BTQ001)
      boutique = await Boutique.findOne({ id: idBoutique });
    }

    if (!boutique) {
      return res.status(404).json({ 
        success: false,
        message: "Boutique non trouvée" 
      });
    }

    // Vérifier que le produit existe
    const produit = await Produit.findById(idProduit);
    if (!produit) {
      return res.status(404).json({ 
        success: false,
        message: "Produit non trouvé" 
      });
    }

    // Vérifier le stock si nécessaire
    if (produit.stock < quantite) {
      return res.status(400).json({ 
        success: false,
        message: "Stock insuffisant" 
      });
    }

    // Création de la commande
    const commande = new Commande({
      numero_commande: "CMD-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      idboutique: boutique._id,  // Utilisation de l'ObjectId MongoDB
      produits: [{ 
        idproduit: produit._id, 
        quantite: parseInt(quantite),
        prix_unitaire: prix
      }],
      idAcheteur,
      idstatus: "PAYEE",
      adresseLivraison,
      date_commande: new Date(),
      montant_total: prix * parseInt(quantite)
    });

    await commande.save();

    // Mise à jour du stock du produit
    produit.stock -= parseInt(quantite);
    await produit.save();

    // Création de la vente
    const vente = new Vente({
      idBoutique: boutique._id,  // Adaptez selon votre modèle Vente
      idProduit: produit._id,
      quantite: parseInt(quantite),
      prix: parseFloat(prix),
      idAcheteur,
      date_vente: new Date(),
      montant_total: prix * parseInt(quantite)
    });

    await vente.save();

    // Réponse succès
    res.status(201).json({
      success: true,
      message: "Commande et paiement effectués avec succès",
      data: {
        commande: {
          id: commande._id,
          numero_commande: commande.numero_commande,
          montant_total: commande.montant_total,
          date: commande.date_commande
        },
        vente: {
          id: vente._id,
          montant: vente.montant_total
        }
      }
    });

  } catch (error) {
    console.error("Erreur dans commanderEtPayer:", error);
    res.status(500).json({ 
      success: false,
      message: "Erreur lors de la création de la commande",
      error: error.message 
    });
  }
};
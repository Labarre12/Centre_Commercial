const Commande = require('../../models/Commande');
const Produit  = require('../../models/Produit');
const jwt      = require('jsonwebtoken');
const JWT_SECRET = 'ton_secret_jwt';

// Passer une commande
exports.passerCommande = async (req, res) => {
  try {
    // Récupérer idAcheteur depuis le token JWT
    let idAcheteur = req.body.idAcheteur;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try { const decoded = jwt.verify(authHeader.slice(7), JWT_SECRET); idAcheteur = decoded.id; } catch (_) {}
    }
    if (!idAcheteur) return res.status(401).json({ message: 'Non authentifié' });

    // Mapper produits : { produit: mongoId, quantite } → { idproduit, quantite }
    const produitsRaw = Array.isArray(req.body.produits) ? req.body.produits : [];
    const produits = produitsRaw.map(p => ({ idproduit: p.produit || p.idproduit, quantite: p.quantite }));

    // Récupérer idboutique depuis le premier produit
    let idboutique = req.body.idboutique;
    if (!idboutique && produits.length) {
      const p = await Produit.findById(produits[0].idproduit).catch(() => null);
      if (p) idboutique = p.idboutique;
    }

    const idcommande = 'CMD-' + Date.now();
    const numero_commande = 'CC-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 90000 + 10000);

    const commande = new Commande({
      idcommande,
      numero_commande,
      idboutique,
      produits,
      idAcheteur,
      idstatus: 'STA001',
      adresseLivraison: req.body.adresseLivraison || '',
    });
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

    const enriched = await Promise.all(commandes.map(async cmd => {
      const obj = cmd.toObject();
      let total = 0;
      obj.produits = await Promise.all(obj.produits.map(async item => {
        const p = await Produit.findById(item.idproduit).select('libelle prix').catch(() => null);
        const prix = p?.prix || 0;
        total += prix * (item.quantite || 1);
        return { ...item, libelle: p?.libelle || 'Produit inconnu', prix };
      }));
      obj.total = total;
      return obj;
    }));

    res.status(200).json(enriched);
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

const Vente = require('../../models/Vente');
const Boutique = require('../../models/Boutique');
const Acheteur = require('../../models/Acheteur');

// Liste de tous les acheteurs (pour selects)
exports.getAllAcheteurs = async (req, res) => {
  try {
    const clients = await Acheteur.find({}, 'idAcheteur nom mail').sort({ nom: 1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Nombre total de clients uniques
exports.getTotalClients = async (req, res) => {
  try {
    const clients = await Vente.distinct('idAcheteur');
    res.json({ totalClients: clients.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Nombre de clients par filtre (date ou achat min)
exports.getClientsByFilter = async (req, res) => {
  try {
    const { dateDebut, dateFin, achatMin } = req.query;
    let filter = {};

    if (dateDebut || dateFin) {
      filter.createdAt = {};
      if (dateDebut) filter.createdAt.$gte = new Date(dateDebut);
      if (dateFin) filter.createdAt.$lte = new Date(dateFin);
    }

    const ventes = await Vente.find(filter);

    // Calcul total achat par client
    const clientsMap = {};
    ventes.forEach(v => {
      if (!clientsMap[v.idAcheteur]) clientsMap[v.idAcheteur] = 0;
      clientsMap[v.idAcheteur] += v.prix * v.quantite;
    });

    // Filtrer par achatMin si fourni
    const result = Object.entries(clientsMap)
      .filter(([_, total]) => !achatMin || total >= parseFloat(achatMin))
      .map(([idAcheteur, total]) => ({ idAcheteur, total }));

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clients qui achètent le plus souvent
exports.getTopBuyers = async (req, res) => {
  try {
    const ventes = await Vente.aggregate([
      { $group: { _id: "$idAcheteur", nombreAchats: { $sum: 1 } } },
      { $sort: { nombreAchats: -1 } },
      { $limit: 10 }
    ]);

    res.json(ventes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clients qui dépensent le plus
exports.getTopSpenders = async (req, res) => {
  try {
    const ventes = await Vente.aggregate([
      { $group: { _id: "$idAcheteur", totalDepense: { $sum: { $multiply: ["$prix", "$quantite"] } } } },
      { $sort: { totalDepense: -1 } },
      { $limit: 10 }
    ]);

    res.json(ventes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Boutique qui vend le plus
exports.getTopBoutiques = async (req, res) => {
  try {
    const ventes = await Vente.aggregate([
      { $group: { _id: "$idBoutique", totalVentes: { $sum: { $multiply: ["$prix", "$quantite"] } } } },
      { $sort: { totalVentes: -1 } },
      { $limit: 10 } 
    ]);

    res.json(ventes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Historique d’un client
exports.getClientHistory = async (req, res) => {
  try {
    const ventes = await Vente.find({ idAcheteur: req.params.idAcheteur });
    res.json(ventes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Top produits vendus
exports.getTopProducts = async (req, res) => {
  try {
    const ventes = await Vente.aggregate([
      { $group: { _id: "$idProduit", totalVentes: { $sum: "$quantite" } } },
      { $sort: { totalVentes: -1 } },
      { $limit: 10 }
    ]);

    res.json(ventes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Statistiques par période
exports.getSalesByPeriod = async (req, res) => {
  try {
    const { start, end } = req.query;
    const filter = {};

    if (start || end) {
      filter.createdAt = {};
      if (start) filter.createdAt.$gte = new Date(start);
      if (end) filter.createdAt.$lte = new Date(end);
    }

    const ventes = await Vente.find(filter);

    // Total ventes et clients uniques
    const totalVentes = ventes.reduce((sum, v) => sum + v.prix * v.quantite, 0);
    const clients = [...new Set(ventes.map(v => v.idAcheteur))];
    const boutiques = [...new Set(ventes.map(v => v.idBoutique))];

    res.json({
      totalVentes,
      totalClients: clients.length,
      totalBoutiques: boutiques.length
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ventes par boutique
exports.getSalesByBoutique = async (req, res) => {
  try {
    const ventes = await Vente.find({ idBoutique: req.params.idBoutique });
    res.json(ventes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

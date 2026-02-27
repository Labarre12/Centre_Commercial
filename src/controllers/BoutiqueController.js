const Boutique = require('../models/Boutique');
const Vente = require('../models/Vente');
const Acheteur = require('../models/Acheteur');

// Toutes les boutiques avec statut ouvert/fermé calculé en temps réel
exports.getBoutiquesWithStatus = async (req, res) => {
  try {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hh}:${mm}`;

    const boutiques = await Boutique.find();
    const result = boutiques.map(b => {
      const isOpen =
        !!b.ouverture &&
        b.ouverture <= currentTime &&
        (!b.fermeture || b.fermeture === '' || b.fermeture >= currentTime);
      return { ...b.toObject(), isOpen };
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir les boutiques ouvertes maintenant
exports.getBoutiquesOuvertes = async (req, res) => {
  try {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hh}:${mm}`;
    const boutiques = await Boutique.find({
      ouverture: { $lte: currentTime },
      $or: [{ fermeture: { $gte: currentTime } }, { fermeture: null }, { fermeture: '' }]
    });
    res.status(200).json(boutiques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir les boutiques du foodcourt
exports.getBoutiquesFoodcourt = async (req, res) => {
  try {
    const boutiques = await Boutique.find({ categorie: { $in: ['Restaurant', 'Café', 'Fast Food', 'Restauration'] } });
    res.status(200).json(boutiques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir toutes les boutiques
exports.getAllBoutiques = async (req, res) => {
  try {
    const boutiques = await Boutique.getAllBoutiques();
    res.status(200).json(boutiques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une boutique par ID
exports.getByIdBoutique = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const boutique = await Boutique.getByIdBoutique(idBoutique);
    if (!boutique) {
      return res.status(404).json({ message: 'Boutique non trouvée' });
    }
    res.status(200).json(boutique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier une boutique
exports.updateBoutique = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const boutique = await Boutique.findOneAndUpdate(
      { idboutique: idBoutique },
      req.body,
      { new: true }
    );
    if (!boutique) {
      return res.status(404).json({ message: 'Boutique non trouvée' });
    }
    res.status(200).json(boutique);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Voir tous les clients ayant acheté dans la boutique
exports.getClients = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const { date, montantMin } = req.query;

    const filter = { idBoutique };
    if (date) filter.createdAt = { $gte: new Date(date) };

    const ventes = await Vente.find(filter);

    // Regrouper par acheteur avec total dépensé
    const acheteurMap = {};
    for (const vente of ventes) {
      const total = vente.prix * vente.quantite;
      if (!acheteurMap[vente.idAcheteur]) {
        acheteurMap[vente.idAcheteur] = { idAcheteur: vente.idAcheteur, totalDepense: 0 };
      }
      acheteurMap[vente.idAcheteur].totalDepense += total;
    }

    let clients = Object.values(acheteurMap);
    if (montantMin) clients = clients.filter(c => c.totalDepense >= Number(montantMin));

    // Enrichir avec les infos acheteur
    const result = await Promise.all(clients.map(async (c) => {
      const acheteur = await Acheteur.findOne({ idAcheteur: c.idAcheteur });
      return { ...acheteur?.toObject(), totalDepense: c.totalDepense };
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Voir les clients VIP (qui achètent le plus)
exports.getTopClients = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const { dateDebut, dateFin } = req.query;

    const filter = { idBoutique };
    if (dateDebut || dateFin) {
      filter.createdAt = {};
      if (dateDebut) filter.createdAt.$gte = new Date(dateDebut);
      if (dateFin) filter.createdAt.$lte = new Date(dateFin);
    }

    const ventes = await Vente.find(filter);

    const acheteurMap = {};
    for (const vente of ventes) {
      const total = vente.prix * vente.quantite;
      if (!acheteurMap[vente.idAcheteur]) {
        acheteurMap[vente.idAcheteur] = { idAcheteur: vente.idAcheteur, totalDepense: 0, nbAchats: 0 };
      }
      acheteurMap[vente.idAcheteur].totalDepense += total;
      acheteurMap[vente.idAcheteur].nbAchats += 1;
    }

    const sorted = Object.values(acheteurMap).sort((a, b) => b.totalDepense - a.totalDepense);

    const result = await Promise.all(sorted.map(async (c) => {
      const acheteur = await Acheteur.findOne({ idAcheteur: c.idAcheteur });
      return { ...acheteur?.toObject(), totalDepense: c.totalDepense, nbAchats: c.nbAchats };
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

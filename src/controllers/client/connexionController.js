const Acheteur = require('../../models/Acheteur');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Secret pour JWT (à stocker idéalement dans .env)
const JWT_SECRET = 'ton_secret_jwt';

// --- Inscription ---
exports.register = async (req, res) => {
  try {
    const { nom, mail, mdp, contact, adresse } = req.body;

    if (!nom || !mail || !mdp || !contact || !adresse) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Vérifier si l'email existe déjà
    const existing = await Acheteur.findOne({ mail });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(mdp, 10);

    // Créer le client
    const client = new Acheteur({
      idAcheteur: Date.now().toString(), // ou UUID si tu préfères
      nom,
      mail,
      mdp: hashedPassword,
      contact,
      adresse,
      dateInscription: new Date()
    });

    await client.save();

    res.status(201).json({ message: 'Compte créé avec succès', clientId: client.idAcheteur });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Connexion / Login ---
exports.login = async (req, res) => {
  try {
    const { mail, mdp } = req.body;

    if (!mail || !mdp) return res.status(400).json({ message: 'Email et mot de passe requis' });

    const client = await Acheteur.findOne({ mail });
    if (!client) return res.status(404).json({ message: 'Compte non trouvé' });

    // Vérifier le mot de passe
    const match = await bcrypt.compare(mdp, client.mdp);
    if (!match) return res.status(401).json({ message: 'Mot de passe incorrect' });

    // Générer token JWT
    const token = jwt.sign({ id: client.idAcheteur, role: 'client' }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Connexion réussie', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Déconnexion ---
exports.logout = async (req, res) => {
  try {
    // Côté JWT stateless, on ne peut pas "supprimer" le token côté serveur
    // Le client doit simplement supprimer le token stocké localement
    res.json({ message: 'Déconnexion réussie' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
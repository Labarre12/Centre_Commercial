const Admin = require('../models/Admin');

exports.login = async (req, res) => {
  try {
    const { matricule, mdp } = req.body;

    if (!matricule || !mdp) {
      return res.status(400).json({ message: 'Matricule et mot de passe requis' });
    }

    const received = { matricule: matricule.trim(), mdp: mdp.trim().toLowerCase() };
    console.log('[LOGIN] Reçu :', received);

    // Chercher uniquement par matricule d'abord pour voir ce qui existe
    const byMatricule = await Admin.findOne({ matricule: received.matricule });
    console.log('[LOGIN] Trouvé par matricule :', byMatricule ? { matricule: byMatricule.matricule, mdp: byMatricule.mdp, role: byMatricule.role } : null);

    const admin = await Admin.findOne(received);
    console.log('[LOGIN] Trouvé avec les deux critères :', admin ? 'oui' : 'non');

    if (!admin) {
      return res.status(401).json({ message: 'Matricule ou mot de passe incorrect' });
    }

    res.json({
      success: true,
      role: admin.role,
      matricule: admin.matricule,
      id: admin._id
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

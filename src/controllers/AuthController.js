const Admin = require('../models/Admin');

exports.login = async (req, res) => {
  try {
    const { matricule, mdp } = req.body;

    if (!matricule || !mdp) {
      return res.status(400).json({ message: 'Matricule et mot de passe requis' });
    }

    const admin = await Admin.findOne({
      matricule: matricule.trim(),
      mdp: mdp.trim().toLowerCase()
    });

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

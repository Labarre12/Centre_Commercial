const Admin = require('../../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { mdp, role } = req.body;

    const hashedPassword = await bcrypt.hash(mdp, 10);

    const newUser = new Admin({
      mdp: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({
      message: "Utilisateur créé",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { matricule, mdp } = req.body;

    const user = await Admin.findOne({ matricule });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const isMatch = await bcrypt.compare(mdp, user.mdp);

    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Vérification rôle ADMIN seulement
    if (user.role !== "ADMIN") {
    return res.status(403).json({ message: "Accès refusé" });
    }

    const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'ton_secret_jwt',
    { expiresIn: "1d" }
    );

    res.status(200).json({
    message: `Connexion réussie en tant que ${user.role}`,
    role: user.role,
    token
    });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

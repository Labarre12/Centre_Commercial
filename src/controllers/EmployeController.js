const Employe = require('../models/Employe');

// Ajouter un employé
exports.addEmploye = async (req, res) => {
  try {
    const employe = new Employe({ ...req.body, idboutique: req.params.idBoutique });
    await employe.save();
    res.status(201).json(employe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lister les employés d'une boutique
exports.getEmployesByBoutique = async (req, res) => {
  try {
    const { idBoutique } = req.params;
    const { role } = req.query;

    const filter = { idboutique: idBoutique };
    if (role) filter.role = role;

    const employes = await Employe.find(filter);
    res.status(200).json(employes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier un employé
exports.updateEmploye = async (req, res) => {
  try {
    const employe = await Employe.findOneAndUpdate(
      { idEmploye: req.params.idEmploye },
      req.body,
      { new: true }
    );
    if (!employe) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    res.status(200).json(employe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un employé
exports.deleteEmploye = async (req, res) => {
  try {
    const employe = await Employe.findOneAndDelete({ idEmploye: req.params.idEmploye });
    if (!employe) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    res.status(200).json({ message: 'Employé supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

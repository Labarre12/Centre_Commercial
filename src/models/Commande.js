const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  idcommande: {
    type: String,
    required: true,
    unique: true,
  },
  numero_commande: {
    type: String,
    required: true,
  },
  idboutique: {
    type: String,
    required: true,
  },
  produits: [
    {
      idproduit: { type: String, required: true },
      quantite: { type: Number, required: true },
    }
  ],
  idAcheteur: {
    type: String,
    required: true,
  },
  idstatus: {
    type: String,
    required: true,
  },
  adresseLivraison: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Commande', commandeSchema);

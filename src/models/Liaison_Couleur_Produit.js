const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idLiaisonCouleur: {
    type: String,
    required: true,
    unique: true,
  },
  idcouleur: {
    type: String,
    required: true,
  },
  idproduit: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Liaison_couleur_produit', userSchema);
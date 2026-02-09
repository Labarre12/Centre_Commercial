const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idProduit: {
    type: String,
    required: true,
    unique: true,
  },
  libelle: {
    type: String,
    required: true,
  },
  idboutique: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  idCategorieProduit: {
    type: String,
    required: true,
  },
  idLiaisonCouleur: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Produit', userSchema);
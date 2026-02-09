const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idCategorieProduit: {
    type: String,
    required: true,
    unique: true,
  },
  libelle: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Categorie_produit', userSchema);
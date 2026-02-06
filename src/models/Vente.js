const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idVente: {
    type: String,
    required: true,
    unique: true,
  },
  idBoutique: {
    type: String,
    required: true,
  },
  idProduit: {
    type: String,
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  idAcheteur: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vente', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idcommande: {
    type: String,
    required: true,
    unique: true,
  },
  numero_commande: {
    type: String,
    required: true,
  },
  idproduit: {
    type: String,
    required: true,
    unique: true,
  },
  idAcheteur: {
    type: String,
    required: true,
  },
  idstatus: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Commande', userSchema);
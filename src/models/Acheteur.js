const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idAcheteur: {
    type: String,
    required: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  },
  dateInscription: {
    type: Date,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Acheteur', userSchema);
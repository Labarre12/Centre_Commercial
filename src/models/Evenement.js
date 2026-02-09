const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idevenement: {
    type: String,
    required: true,
    unique: true,
  },
  libelle: {
    type: String,
    required: true,
  },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },
  cible: {
    type: String,
    required: true,
  },
  idStatus: {
    type: String,
    required: true,
  },
  libelle: {
    type: String,
    required: true,  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Evenement', userSchema);
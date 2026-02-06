const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idboutique: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  libelle: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
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
  url: {
    type: String,
    required: true,
  },
  ouverture: {
    type: String,
    required: true,
  },
  fermeture: {
    type: String,
  },
  idCategorie: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Boutique', userSchema);
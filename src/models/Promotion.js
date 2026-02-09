const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  idBoutiques: {
    type: [String], 
    required: true,
    default: []
  },
  idProduits: {
    type: [String], 
    required: false,
    default: []
  },
  typeReduction: {
    type: String,
    enum: ['pourcentage', 'montant'], 
    required: true
  },
  valeur: {
    type: Number, 
    required: true
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  actif: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('Promotion', promotionSchema);

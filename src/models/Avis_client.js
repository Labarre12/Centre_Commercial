const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idAvis: {
    type: String,
    unique: true,
    sparse: true,
  },
  idboutique: {
    type: String,
  },
  idProduit: {
    type: String,
  },
  idAcheteur: {
    type: String,
  },
  commentaire: {
    type: String,
  },
  note: {
    type: Number,
  },
  avis: {
    type: String,
  },
  notation: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Avis_client', userSchema);
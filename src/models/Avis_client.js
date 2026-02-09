const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idAvis: {
    type: String,
    required: true,
    unique: true,
  },
  idboutique: {
    type: String,
    required: true,
  },
  idAcheteur: {
    type: String,
    required: true,
  },
  avis: {
    type: String,
    required: true,
  },
  notation: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Avis_client', userSchema);
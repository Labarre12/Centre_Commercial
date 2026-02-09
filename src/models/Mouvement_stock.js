const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idmouvement: {
    type: String,
    required: true,
    unique: true,
  },
  mouvement: {
    type: String,
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  idproduit: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mouvement_stock', userSchema);
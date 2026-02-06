const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idCategorieBoutique: {
    type: String,
    required: true,
    unique: true,
  },
  idboutique: {
    type: String,
    required: true,
  },
  idEmplacement: {
    type: String,
    required: true,
   } 
}, {
  timestamps: true
});

module.exports = mongoose.model('Categorie_boutique', userSchema);
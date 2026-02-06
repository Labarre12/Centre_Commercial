const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idLB: {
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

module.exports = mongoose.model('Liaison_boutique_emplacement', userSchema);
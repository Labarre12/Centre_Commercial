const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idEmplacement: {
    type: String,
    required: true,
    unique: true,
  },
  numéro: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Emplacement', userSchema);
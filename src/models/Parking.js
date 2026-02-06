const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idParking: {
    type: String,
    required: true,
    unique: true,
  },
  libelle: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Parking', userSchema);
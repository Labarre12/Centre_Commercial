const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idreservation: {
    type: String,
    required: true,
    unique: true,
  },
  idproduit: {
    type: String,
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
  idAcheteur: {
    type: String,
    required: true,
  },
  idstatus: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reservation_client', userSchema);
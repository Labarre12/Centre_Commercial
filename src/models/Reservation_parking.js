const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id_reservationP: {
    type: String,
    required: true,
    unique: true,
  },
  idparking: {
    type: String,
    required: true,
  },
  reservateur: {
    type: String,
    required: true,
  },
  idStatus: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reservation_parking', userSchema);
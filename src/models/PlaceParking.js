const mongoose = require('mongoose');

const placeParkingSchema = new mongoose.Schema({
  numero: { type: String, required: true, unique: true, trim: true },
  secteur: { type: String, required: true, trim: true },
  type: { type: String, enum: ['normal', 'VIP', 'PMR'], default: 'normal' },
  disponible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('PlaceParking', placeParkingSchema);

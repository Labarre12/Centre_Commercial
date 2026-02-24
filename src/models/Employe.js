const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
  idEmploye: {
    type: String,
    required: true,
    unique: true,
  },
  idboutique: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Employe', employeSchema);

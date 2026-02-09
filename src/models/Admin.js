const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  matricule: {
    type: String,
    required: true,
    trim: true
  },
  mdp: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'BOUTIQUE']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', userSchema);
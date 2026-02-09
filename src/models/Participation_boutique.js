const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idparticipation: {
    type: String,
    required: true,
    unique: true,
  },
  idevenement: {
    type: String,
    required: true,
  },
  idboutique: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Participation_boutique', userSchema);
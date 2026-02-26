const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idLoyer: {
    type: String,
    required: true,
    unique: true,
  },
  idboutique: {
    type: String,
    required: true,
  },
  mois: {
    type: Number,
    required: true,
  },
  annee: {
    type: Number,
    required: true,
  },
  montant: {
    type: Number,
    required: true,
  },
  datePaiement: {
    type: Date,
    required: true,
  },
  idStatus: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const auditPlugin = require('../plugins/auditPlugin');
userSchema.plugin(auditPlugin, { modelName: 'Loyer' });

module.exports = mongoose.model('Loyer', userSchema);
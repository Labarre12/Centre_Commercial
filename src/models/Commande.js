const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  idcommande: {
    type: String,
    required: true,
    unique: true,
  },
  numero_commande: {
    type: String,
    required: true,
  },
  idboutique: {
    type: String,
    required: true,
  },
  produits: [
    {
      idproduit: { type: String, required: true },
      quantite: { type: Number, required: true },
    }
  ],
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

const auditPlugin = require('../plugins/auditPlugin');
commandeSchema.plugin(auditPlugin, { modelName: 'Commande' });

module.exports = mongoose.model('Commande', commandeSchema);

const mongoose = require('mongoose');
const Counter = require('./Counter');


const commandeSchema = new mongoose.Schema({
  idcommande: {
    type: String,
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
  },
  adresseLivraison: {
    type: String,
  },
}, {
  timestamps: true,
});

userSchema.pre("save", async function(next) {
  if (!this.idcommande) {

    const counter = await Counter.findOneAndUpdate(
      { name: "commande" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idcommande = "CMD" + counter.seq.toString().padStart(3, "0");
  }

  next();
})

module.exports = mongoose.model('Commande', userSchema);
module.exports = mongoose.model('Commande', commandeSchema);

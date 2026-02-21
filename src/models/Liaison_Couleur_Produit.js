const mongoose = require('mongoose');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema({
    idLiaisonCouleurP: {
    type: String,
    unique: true,
  },
  idcouleur: {
    type: String,
    required: true,
  },
  idproduit: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function(next) {
  if (!this.idLiaisonCouleurP) {

    const counter = await Counter.findOneAndUpdate(
      { name: "liaison_couleur_p" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idLiaisonCouleurP = "LCP" + counter.seq.toString().padStart(3, "0");
  }

  next();
})

module.exports = mongoose.model('Liaison_couleur_produit', userSchema);
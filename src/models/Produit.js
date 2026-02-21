const mongoose = require('mongoose');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema({
  idProduit: {
    type: String,
    unique: true,
  },
  libelle: {
    type: String,
    required: true,
  },
  idboutique: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  idCategorieProduit: {
    type: String,
    required: true,
  },
  idLiaisonCouleur: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function(next) {
  if (!this.idProduit) {

    const counter = await Counter.findOneAndUpdate(
      { name: "produit" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idProduit = "PROD" + counter.seq.toString().padStart(3, "0");
  }

  next();
})

module.exports = mongoose.model('Produit', userSchema);